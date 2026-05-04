import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, LogOut, Loader2, Image as ImageIcon, X } from "lucide-react";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description: string;
  images: string[];
}

export default function Admin() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Form state
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [price, setPrice] = useState(0);
  const [mileage, setMileage] = useState(0);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
      setSession(session);
    });

    fetchCars();
  }, [navigate]);

  const fetchCars = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) toast.error(error.message);
    else setCars(data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const imageUrls: string[] = [];

      // 1. Upload images
      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from("car_images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("car_images")
          .getPublicUrl(filePath);
        
        imageUrls.push(publicUrl);
      }

      // 2. Insert car data
      const { error: insertError } = await supabase.from("cars").insert({
        make,
        model,
        year,
        price,
        mileage,
        description,
        images: imageUrls,
      });

      if (insertError) throw insertError;

      toast.success("Автомобиль добавлен успешно");
      setShowForm(false);
      resetForm();
      fetchCars();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const deleteCar = async (id: string, imageUrls: string[]) => {
    if (!confirm("Вы уверены, что хотите удалить этот автомобиль?")) return;

    try {
      // 1. Delete car from DB
      const { error: deleteError } = await supabase.from("cars").delete().eq("id", id);
      if (deleteError) throw deleteError;

      // 2. Delete images from Storage
      if (imageUrls.length > 0) {
        const paths = imageUrls.map(url => url.split("/").pop() || "");
        await supabase.storage.from("car_images").remove(paths);
      }

      toast.success("Автомобиль удален");
      fetchCars();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setMake("");
    setModel("");
    setYear(new Date().getFullYear());
    setPrice(0);
    setMileage(0);
    setDescription("");
    setFiles([]);
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Панель управления</h1>
            <p className="text-muted-foreground">Управление инвентарем автосалона</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "outline" : "default"}>
              {showForm ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
              {showForm ? "Отмена" : "Добавить авто"}
            </Button>
            <Button onClick={handleLogout} variant="ghost">
              <LogOut className="mr-2 h-4 w-4" /> Выйти
            </Button>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleAddCar} className="glass-strong p-6 rounded-2xl space-y-6 animate-scale-in">
            <h2 className="text-xl font-semibold">Новое объявление</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Марка</label>
                <Input value={make} onChange={e => setMake(e.target.value)} required placeholder="например, BMW" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Модель</label>
                <Input value={model} onChange={e => setModel(e.target.value)} required placeholder="например, X5" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Год выпуска</label>
                <Input type="number" value={year} onChange={e => setYear(parseInt(e.target.value))} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Цена ($)</label>
                <Input type="number" value={price} onChange={e => setPrice(parseFloat(e.target.value))} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Пробег (км)</label>
                <Input type="number" value={mileage} onChange={e => setMileage(parseInt(e.target.value))} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Фотографии</label>
                <Input type="file" multiple onChange={e => setFiles(Array.from(e.target.files || []))} accept="image/*" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Описание</label>
              <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Подробная информация об автомобиле..." />
            </div>
            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {uploading ? "Загрузка..." : "Сохранить объявление"}
            </Button>
          </form>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : cars.length === 0 ? (
            <div className="col-span-full text-center py-12 glass rounded-2xl">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Нет доступных автомобилей. Добавьте первый!</p>
            </div>
          ) : (
            cars.map(car => (
              <div key={car.id} className="glass rounded-2xl overflow-hidden lift border border-border/50">
                <div className="aspect-[16/10] relative bg-muted">
                  {car.images[0] ? (
                    <img src={car.images[0]} alt={car.make} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      Нет фото
                    </div>
                  )}
                  <button 
                    onClick={() => deleteCar(car.id, car.images)}
                    className="absolute top-2 right-2 p-2 bg-destructive/80 text-destructive-foreground rounded-full hover:bg-destructive transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{car.make} {car.model}</h3>
                      <p className="text-xs text-muted-foreground">{car.year} г. • {car.mileage.toLocaleString()} км</p>
                    </div>
                    <div className="text-primary font-bold">${car.price.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
