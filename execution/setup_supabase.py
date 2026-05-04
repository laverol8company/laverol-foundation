import psycopg2
import sys

def setup_supabase(conn_string):
    try:
        conn = psycopg2.connect(conn_string)
        conn.autocommit = True
        cur = conn.cursor()

        print("Creating cars table...")
        cur.execute("""
            CREATE TABLE IF NOT EXISTS cars (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                make TEXT NOT NULL,
                model TEXT NOT NULL,
                year INTEGER NOT NULL,
                price NUMERIC NOT NULL,
                mileage INTEGER NOT NULL,
                body_type TEXT,
                transmission TEXT,
                fuel_type TEXT,
                engine_capacity TEXT,
                color TEXT,
                vin TEXT,
                condition TEXT,
                description TEXT,
                features JSONB DEFAULT '[]',
                images TEXT[] DEFAULT '{}',
                created_at TIMESTAMPTZ DEFAULT now(),
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        """)

        print("Enabling RLS on cars...")
        cur.execute("ALTER TABLE cars ENABLE ROW LEVEL SECURITY;")
        
        print("Creating RLS policies for cars...")
        cur.execute("DROP POLICY IF EXISTS \"Public can view cars\" ON cars;")
        cur.execute("CREATE POLICY \"Public can view cars\" ON cars FOR SELECT USING (true);")
        
        cur.execute("DROP POLICY IF EXISTS \"Admins can manage cars\" ON cars;")
        cur.execute("CREATE POLICY \"Admins can manage cars\" ON cars FOR ALL TO authenticated USING (true) WITH CHECK (true);")

        print("Creating profiles table...")
        cur.execute("""
            CREATE TABLE IF NOT EXISTS profiles (
                id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
                email TEXT UNIQUE,
                role TEXT DEFAULT 'user',
                created_at TIMESTAMPTZ DEFAULT now()
            );
        """)
        cur.execute("ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;")
        cur.execute("DROP POLICY IF EXISTS \"Users can view own profile\" ON profiles;")
        cur.execute("CREATE POLICY \"Users can view own profile\" ON profiles FOR SELECT USING (auth.uid() = id);")

        print("Setting up storage policies (requires storage schema to exist)...")
        # Ensure bucket exists
        cur.execute("INSERT INTO storage.buckets (id, name, public) VALUES ('car_images', 'car_images', true) ON CONFLICT (id) DO NOTHING;")
        
        cur.execute("DROP POLICY IF EXISTS \"Public access to images\" ON storage.objects;")
        cur.execute("CREATE POLICY \"Public access to images\" ON storage.objects FOR SELECT USING (bucket_id = 'car_images');")
        
        cur.execute("DROP POLICY IF EXISTS \"Authenticated upload images\" ON storage.objects;")
        cur.execute("CREATE POLICY \"Authenticated upload images\" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'car_images') WITH CHECK (bucket_id = 'car_images');")

        print("Setup completed successfully.")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    uri = "postgresql://postgres.jbwumjejbdorpdcqzdos:GNh$i8Ac8Fx#yCx@aws-1-eu-central-1.pooler.supabase.com:6543/postgres"
    setup_supabase(uri)
