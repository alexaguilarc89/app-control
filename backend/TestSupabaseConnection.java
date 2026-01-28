import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class TestSupabaseConnection {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://db.hhprnfycfjqjsstkukit.supabase.co:5432/postgres?sslmode=require";
        String user = "postgres";
        String password = "sSWKGfWI73eebFAo";

        try {
            System.out.println("Intentando conectar a Supabase...");
            Class.forName("org.postgresql.Driver");

            Connection conn = DriverManager.getConnection(url, user, password);
            System.out.println("Conexion exitosa a Supabase!");

            // Probar una consulta simple
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT version()");

            if (rs.next()) {
                System.out.println("Version de PostgreSQL: " + rs.getString(1));
            }

            // Verificar tablas
            rs = stmt.executeQuery("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
            System.out.println("Tablas en la base de datos:");
            while (rs.next()) {
                String tableName = rs.getString("table_name");
                System.out.println("  - " + tableName);
            }

            // Verificar tabla entidades
            rs = stmt.executeQuery("SELECT COUNT(*) as count FROM entidades");
            if (rs.next()) {
                System.out.println("Tabla 'entidades' existe con " + rs.getInt("count") + " registros");
            }

            // Verificar tabla sectoristas
            rs = stmt.executeQuery("SELECT COUNT(*) as count FROM sectoristas");
            if (rs.next()) {
                System.out.println("Tabla 'sectoristas' existe con " + rs.getInt("count") + " registros");
            }

            // Verificar tabla sectorista_entidades
            rs = stmt.executeQuery("SELECT COUNT(*) as count FROM sectorista_entidades");
            if (rs.next()) {
                System.out.println("Tabla 'sectorista_entidades' existe con " + rs.getInt("count") + " registros");
            }

            conn.close();
            System.out.println("Prueba de conexión completada exitosamente!");

        } catch (Exception e) {
            System.err.println("Error conectando a Supabase:");
            e.printStackTrace();
        }
    }
}