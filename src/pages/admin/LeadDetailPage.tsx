import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLeadById, updateLeadStatus } from '../../lib/crmApi';
import { Lead } from '../../types/crm';
import { 
  ArrowLeft, MapPin, Phone, Globe, Instagram, Star, Trash2, Send, Copy, AlertCircle, CheckCircle2, Loader2 
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Local state for the editable message hook
  const [messageHook, setMessageHook] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchLead = async () => {
      setLoading(true);
      try {
        const data = await getLeadById(id);
        setLead(data);
        setMessageHook(data.cold_message_hook || '');
      } catch (err: any) {
        setError(err.message || 'Ошибка загрузки лида');
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <AlertCircle className="w-12 h-12 mb-4 text-destructive" />
        <p className="text-lg">{error || 'Лид не найден'}</p>
        <button onClick={() => navigate('/admin/crm')} className="mt-4 text-primary hover:underline">
          Вернуться к списку
        </button>
      </div>
    );
  }

  const getPriorityBadge = (priority: string | null) => {
    if (priority === 'hot') return <span className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-sm font-bold">Hot 🔥</span>;
    if (priority === 'warm') return <span className="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-sm font-bold">Warm 🌡</span>;
    if (priority === 'cold') return <span className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-sm font-bold">Cold ❄️</span>;
    return <span className="px-3 py-1 bg-gray-500/20 text-gray-500 rounded-full text-sm font-bold">-</span>;
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return 'text-muted-foreground';
    if (score >= 8) return 'text-green-500';
    if (score >= 5) return 'text-yellow-500';
    return 'text-red-500';
  };

  const handleSend = async () => {
    try {
      if (lead.instagram_url) {
        window.open(lead.instagram_url, '_blank');
      } else if (lead.phone) {
        const cleanPhone = lead.phone.replace(/\D/g, '');
        window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageHook)}`, '_blank');
      } else {
        await navigator.clipboard.writeText(messageHook);
        toast({
          title: "Скопировано",
          description: "Сообщение скопировано в буфер обмена",
          // removed icon
        });
      }

      await updateLeadStatus(lead.id, 'contacted');
      toast({
        title: "Статус обновлен",
        description: "Лид перемещен в хранилище",
      });
      navigate('/admin/crm');
    } catch (err: any) {
      toast({
        title: "Ошибка",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  const handleDelete = async () => {
    if (!confirm('Вы уверены, что хотите переместить лид в корзину?')) return;
    try {
      await updateLeadStatus(lead.id, 'deleted');
      toast({
        title: "Удалено",
        description: "Лид перемещен в корзину",
      });
      navigate('/admin/crm');
    } catch (err: any) {
      toast({
        title: "Ошибка",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  // Determine button label and icon
  let actionLabel = "Скопировать сообщение";
  let ActionIcon = Copy;
  if (lead.instagram_url) {
    actionLabel = "Написать в Instagram";
    ActionIcon = Instagram;
  } else if (lead.phone) {
    actionLabel = "Написать в WhatsApp";
    ActionIcon = Send;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <button 
        onClick={() => navigate('/admin/crm')}
        className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Назад
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-xl border border-border/50">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{lead.business_name || 'Неизвестная компания'}</h1>
                <div className="flex items-center gap-4 mt-4">
                  {getPriorityBadge(lead.outreach_priority)}
                  {lead.rating && (
                    <div className="flex items-center text-yellow-500 font-bold bg-yellow-500/10 px-3 py-1 rounded-full text-sm">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      {lead.rating} ({lead.review_count} отзывов)
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center bg-muted/30 p-4 rounded-xl border border-border/50">
                <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-bold">Score</div>
                <div className={`text-5xl font-black ${getScoreColor(lead.score)}`}>
                  {lead.score ?? '-'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {lead.phone && (
                <div className="flex items-center text-muted-foreground">
                  <Phone className="w-5 h-5 mr-3 text-primary" />
                  <a href={`tel:${lead.phone}`} className="hover:text-primary transition-colors">{lead.phone}</a>
                </div>
              )}
              {lead.website_url && (
                <div className="flex items-center text-muted-foreground">
                  <Globe className="w-5 h-5 mr-3 text-primary" />
                  <a href={lead.website_url} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                    {lead.website_url.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {lead.instagram_url && (
                <div className="flex items-center text-muted-foreground">
                  <Instagram className="w-5 h-5 mr-3 text-pink-500" />
                  <a href={lead.instagram_url} target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors">
                    Instagram Профиль
                  </a>
                </div>
              )}
              {lead.address && (
                <div className="flex items-center text-muted-foreground col-span-full">
                  <MapPin className="w-5 h-5 mr-3 text-primary shrink-0" />
                  <span>{lead.address}</span>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {lead.ai_summary && (
                <div>
                  <h3 className="text-lg font-bold mb-2">AI Анализ бизнеса</h3>
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm leading-relaxed text-foreground/90">
                    {lead.ai_summary}
                  </div>
                </div>
              )}

              {lead.recommended_offer && (
                <div>
                  <h3 className="text-lg font-bold mb-2">Рекомендуемый оффер</h3>
                  <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg text-sm font-medium text-green-400">
                    {lead.recommended_offer}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="glass p-8 rounded-xl border border-border/50">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Send className="w-5 h-5 mr-2 text-primary" />
              Шаблон сообщения (Cold Hook)
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Отредактируйте сообщение перед отправкой. Изменения не сохранятся в базе данных.
            </p>
            <textarea
              value={messageHook}
              onChange={(e) => setMessageHook(e.target.value)}
              className="w-full h-48 bg-background border border-border/60 rounded-lg p-4 text-foreground focus:ring-2 focus:ring-primary outline-none resize-y"
              placeholder="Введите сообщение..."
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          <div className="glass p-6 rounded-xl border border-border/50 sticky top-6">
            <h3 className="text-lg font-bold mb-6">Действия</h3>
            
            <button
              onClick={handleSend}
              className="w-full flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-green-500/20 mb-4"
            >
              <ActionIcon className="w-5 h-5 mr-2" />
              {actionLabel}
            </button>

            <button
              onClick={handleDelete}
              className="w-full flex items-center justify-center bg-transparent border-2 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground font-bold py-4 px-6 rounded-xl transition-all"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
