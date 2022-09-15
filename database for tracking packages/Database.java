package tietokanta;

import java.sql.*;
import java.util.Scanner;
import static javax.swing.JFormattedTextField.COMMIT;

public class Database {
    Connection db;
    
    public Database() throws SQLException {
        db = DriverManager.getConnection("jdbc:sqlite:tietokanta.db");
    }
        
    public void luonti() throws SQLException {  
        try {
            Statement s = db.createStatement();
            s.execute("PRAGMA foreign_keys = ON");
            s.execute("CREATE TABLE Paikat (id INTEGER PRIMARY KEY, nimi TEXT UNIQUE NOT NULL)");
            s.execute("CREATE TABLE Asiakkaat (id INTEGER PRIMARY KEY, nimi TEXT UNIQUE NOT NULL)");
            s.execute("CREATE TABLE Paketit (id INTEGER PRIMARY KEY, seurantakoodi TEXT UNIQUE NOT NULL, asiakas_id INTEGER NOT NULL REFERENCES Asiakkaat ON DELETE CASCADE)");
            s.execute("CREATE TABLE Tapahtumat (id INTEGER PRIMARY KEY, paivays TEXT, seurantakoodi_id INTEGER NOT NULL REFERENCES Paketit ON DELETE CASCADE, paikka_id INTEGER NOT NULL REFERENCES Paikat ON DELETE CASCADE, kuvaus TEXT NOT NULL)");
            s.execute("CREATE INDEX idx_seurantakoodiid ON Tapahtumat (seurantakoodi_id)");
            System.out.println("Tietokanta luotu");
        } catch (SQLException e) {
            System.out.println("VIRHE: Tietokanta on jo luotu");
        }
    }
    
    public void paikka(String nimi) throws SQLException {      
        try {   
            PreparedStatement p1 = db.prepareStatement("INSERT INTO Paikat(nimi) VALUES (?) ");
            p1.setString(1,nimi);
            p1.executeUpdate();
            System.out.println("Paikka lisätty");
            
        } catch (SQLException e) {
            if(e.getErrorCode()==1) {
               System.out.println("VIRHE: Tietokantaa ei ole luotu");
            } else {
               System.out.println("VIRHE: Paikka on jo olemassa");
            }
        }
    }
     
    public void asiakas(String nimi) throws SQLException {
        try{
            PreparedStatement p1 = db.prepareStatement("INSERT INTO Asiakkaat(nimi) VALUES (?)");
            p1.setString(1,nimi);
            p1.executeUpdate();
            System.out.println("Asiakas lisätty"); 
            
        } catch (SQLException e) {
            if(e.getErrorCode()==1) {
                System.out.println("VIRHE: Tietokantaa ei ole luotu");
            } else {
                System.out.println("VIRHE: Asiakas on jo olemassa");
            }
        }
    }
    
    public void paketti(String seuranta, String asiakas) throws SQLException {  
        try {
            PreparedStatement p1 = db.prepareStatement("SELECT id FROM Asiakkaat WHERE nimi=?");
            p1.setString(1,asiakas);
            ResultSet r1 = p1.executeQuery();  
        
            PreparedStatement p2 = db.prepareStatement("INSERT INTO Paketit(seurantakoodi,asiakas_id) VALUES (?,?)");
            p2.setString(1,seuranta);
            p2.setString(2,r1.getString("id"));
            p2.executeUpdate();
            System.out.println("Paketti lisätty");
        } 
        catch (SQLException e) {  
            if(e.getErrorCode()==1) {
                System.out.println("VIRHE: Tietokantaa ei ole luotu");
            }
            else if(e.getErrorCode()==19) {
                System.out.println("VIRHE: Seurantakoodi on jo olemassa");
            }
            else if(e.getErrorCode()==0) {
                System.out.println("VIRHE: Asiakasta ei ole olemassa");
            }
        }        
    }
        
    public void tapahtuma(String seurantakoodi2, String paikka, String kuvaus) throws SQLException {
        try {
            PreparedStatement p1 = db.prepareStatement("SELECT id FROM Paketit WHERE seurantakoodi=?");
            p1.setString(1,seurantakoodi2);
            ResultSet r1 = p1.executeQuery();

            PreparedStatement p2 = db.prepareStatement("SELECT id FROM Paikat WHERE nimi=?");
            p2.setString(1,paikka);
            ResultSet r2 = p2.executeQuery();  

            PreparedStatement p4 = db.prepareStatement("SELECT STRFTIME('%d.%m.%Y %H:%M', 'now','localtime');");  
            ResultSet r4 = p4.executeQuery();  

            PreparedStatement p3 = db.prepareStatement("INSERT INTO Tapahtumat(paivays,seurantakoodi_id,paikka_id,kuvaus) VALUES (?,?,?,?)");
            p3.setString(1,r4.getString("STRFTIME('%d.%m.%Y %H:%M', 'now','localtime')"));
            p3.setString(2,r1.getString("id"));
            p3.setString(3,r2.getString("id"));
            p3.setString(4,kuvaus);
            p3.executeUpdate();
            System.out.println("Tapahtuma lisätty");
        
        } catch (SQLException e) {
            if(e.getErrorCode()==1) {
               System.out.println("VIRHE: Tietokantaa ei ole luotu");
            }       
            else {
               System.out.println("VIRHE: Seurantakoodia tai paikkaa ei ole olemassa");
            }   
        }
    }
     
    public void haku(String seuranta) throws SQLException {
        try{      
            PreparedStatement p1 = db.prepareStatement("SELECT id FROM Paketit WHERE seurantakoodi=?");
            p1.setString(1,seuranta);
            ResultSet r1 = p1.executeQuery();
            PreparedStatement p2 = db.prepareStatement("SELECT T.paivays, P.nimi, T.kuvaus FROM Tapahtumat T, Paikat P WHERE T.paikka_id=P.id AND T.seurantakoodi_id=?");
            p2.setString(1,r1.getString("id"));

            ResultSet r2 = p2.executeQuery();  
                while(r2.next()) {
                    System.out.println(r2.getString("paivays")+", "+r2.getString("nimi")+", "+r2.getString("kuvaus"));
                }
        
        } catch (SQLException e) {
            if(e.getErrorCode()==1) {
                System.out.println("VIRHE: Tietokantaa ei ole luotu");
            } else{
                System.out.println("VIRHE: Seurantakoodia ei ole olemassa");
            }    
        }
    }
    
    public void asiakastapahtumat(String asiakas) throws SQLException {
        try{      
            PreparedStatement p1 = db.prepareStatement("SELECT id FROM Asiakkaat WHERE nimi=?");
            p1.setString(1,asiakas);
            ResultSet r1 = p1.executeQuery();
            PreparedStatement p2 = db.prepareStatement("SELECT P.seurantakoodi, count(T.id) FROM Paketit P LEFT JOIN Tapahtumat T  ON T.seurantakoodi_id=P.id WHERE P.asiakas_id=? GROUP BY P.seurantakoodi");
            p2.setString(1,r1.getString("id"));

            ResultSet r2 = p2.executeQuery();  
                while(r2.next()) {
                    System.out.println(r2.getString("seurantakoodi")+", "+r2.getString("count(T.id)") +" tapahtumaa");
                }
        
        } catch (SQLException e) {
            if(e.getErrorCode()==1) {
                System.out.println("VIRHE: Tietokantaa ei ole luotu");
            } else{
                System.out.println("VIRHE: Seurantakoodia ei ole olemassa");
            }    
        }
    } 
    
    public void paikkatapahtumat(String paikka, String paiva) throws SQLException {
        try{      
            PreparedStatement p1 = db.prepareStatement("SELECT id FROM Paikat WHERE nimi=?");
            p1.setString(1,paikka);
            ResultSet r1 = p1.executeQuery();
         
            PreparedStatement p2 = db.prepareStatement("SELECT COUNT(kuvaus) FROM Tapahtumat WHERE paikka_id=? AND paivays LIKE ?");
            p2.setString(1,r1.getString("id"));
            p2.setString(2,paiva+ "%");

            ResultSet r2 = p2.executeQuery();  
                while(r2.next()) {
                    System.out.println("Tapahtumien määrä: "+r2.getString("COUNT(kuvaus)"));
                }
        
        } catch (SQLException e) {
            if(e.getErrorCode()==1) {
                System.out.println("VIRHE: Tietokantaa ei ole luotu");
            } else{
                System.out.println("VIRHE: Paikkaa ei ole olemassa");
            }        
        }       
    }
    
    public void t1paikka() throws SQLException {      
        Statement s = db.createStatement();
        s.execute("BEGIN TRANSACTION");
        try { 
            PreparedStatement p1 = db.prepareStatement("INSERT INTO Paikat(nimi) VALUES (?) ");
            for(int i=1;i<=1000;i++) {
                String nimi = "P"+i;  
                p1.setString(1,nimi);
                p1.executeUpdate();
                //System.out.println("Paikka lisätty");
            }
        } catch (SQLException e) {
            if(e.getErrorCode()==1) {
               System.out.println("VIRHE: Tietokantaa ei ole luotu");
            } else {
                System.out.println("VIRHE: Paikka on jo olemassa");
            }
        }
        s.execute("COMMIT");

    }
     
    public void t2asiakas() throws SQLException {
        Statement s = db.createStatement();
        s.execute("BEGIN TRANSACTION");
        try{ 
            PreparedStatement p1 = db.prepareStatement("INSERT INTO Asiakkaat(nimi) VALUES (?)");
            for(int i=1;i<=1000;i++) {
                String nimi = "A"+i;  
                p1.setString(1,nimi);
                p1.executeUpdate();
                //System.out.println("Asiakas lisätty"); 
           } 
        } catch (SQLException e) {
            if(e.getErrorCode()==1) {
                System.out.println("VIRHE: Tietokantaa ei ole luotu");
            } else {
                System.out.println("VIRHE: Asiakas on jo olemassa");
            }
        }
        s.execute("COMMIT");
    }
    
    public void t3paketti() throws SQLException {   
        Statement s = db.createStatement();
        s.execute("BEGIN TRANSACTION");
        try {
            PreparedStatement p1 = db.prepareStatement("SELECT id FROM Asiakkaat WHERE nimi=?");
            PreparedStatement p2 = db.prepareStatement("INSERT INTO Paketit(seurantakoodi,asiakas_id) VALUES (?,?)");
            for(int i=1;i<=1000;i++) {
                String asiakas = "A"+i;
                String seuranta = "S"+i;
                p1.setString(1,asiakas);
                ResultSet r1 = p1.executeQuery();  

                p2.setString(1,seuranta);
                p2.setString(2,r1.getString("id"));
                p2.executeUpdate();
                //System.out.println("Paketti lisätty");
            }   
        } 
        catch (SQLException e) {  
            if(e.getErrorCode()==1) {
                System.out.println("VIRHE: Tietokantaa ei ole luotu");
            }
            else if(e.getErrorCode()==19) {
                System.out.println("VIRHE: Seurantakoodi on jo olemassa");
            }
            else if(e.getErrorCode()==0) {
                System.out.println("VIRHE: Asiakasta ei ole olemassa");
            }
        }
        s.execute("COMMIT");
        
    }
        
    public void t4tapahtuma() throws SQLException {
        Statement s = db.createStatement();
        s.execute("BEGIN TRANSACTION");
        try {
            
            PreparedStatement p1 = db.prepareStatement("SELECT id FROM Paketit WHERE seurantakoodi=?");
            PreparedStatement p2 = db.prepareStatement("SELECT id FROM Paikat WHERE nimi=?");
            PreparedStatement p4 = db.prepareStatement("SELECT STRFTIME('%d.%m.%Y %H:%M', 'now','localtime');");
            PreparedStatement p3 = db.prepareStatement("INSERT INTO Tapahtumat(paivays,seurantakoodi_id,paikka_id,kuvaus) VALUES (?,?,?,?)");
            for(int y=1;y<=1000;y++) {
                for(int i=1;i<=1000;i++) {
                    String paikka = "P"+i;
                    String seurantakoodi2 = "S"+i;
                    String kuvaus = paikka+seurantakoodi2;
                    p1.setString(1,seurantakoodi2);
                    ResultSet r1 = p1.executeQuery();

                    p2.setString(1,paikka);
                    ResultSet r2 = p2.executeQuery();  

                    ResultSet r4 = p4.executeQuery();  

                    p3.setString(1,r4.getString("STRFTIME('%d.%m.%Y %H:%M', 'now','localtime')"));
                    p3.setString(2,r1.getString("id"));
                    p3.setString(3,r2.getString("id"));
                    p3.setString(4,kuvaus);
                    p3.executeUpdate();
                    //System.out.println("Tapahtuma lisätty");
                }
            }
            
        } catch (SQLException e) {
            if(e.getErrorCode()==1) {
                System.out.println("VIRHE: Tietokantaa ei ole luotu");
            }       
            else {
               System.out.println("VIRHE: Seurantakoodia tai paikkaa ei ole olemassa");
            }
        }
        s.execute("COMMIT");
    }
    
    public void t5asiakaspaketit() throws SQLException {
        Statement s = db.createStatement();
        s.execute("BEGIN TRANSACTION");
        try{      
            PreparedStatement p1 = db.prepareStatement("SELECT id FROM Asiakkaat WHERE nimi=?");
            PreparedStatement p2 = db.prepareStatement("SELECT COUNT(*) FROM Paketit WHERE asiakas_id=?");
            for(int i=1;i<=1000;i++) {
                String asiakas = "A"+i;
                p1.setString(1,asiakas);
                ResultSet r1 = p1.executeQuery();
                p2.setString(1,r1.getString("id"));
                ResultSet r2 = p2.executeQuery();  
                while(r2.next()) {
                   // System.out.println(asiakas+ ": " +r2.getString("count(*)") +" pakettia");
                }
            }      
        } catch (SQLException e) {
            if(e.getErrorCode()==1) {
                System.out.println("VIRHE: Tietokantaa ei ole luotu");
            } else{
                System.out.println("VIRHE: Seurantakoodia ei ole olemassa");
            }    
        }
        s.execute("COMMIT");
    } 
    
    public void t6pakettitapahtumat() throws SQLException {
        Statement s = db.createStatement();
        s.execute("BEGIN TRANSACTION");
        Statement s1 = db.createStatement();
        //s1.executeUpdate("CREATE INDEX idx_seuranta ON Paketit (seurantakoodi)");
        try{      
            PreparedStatement p1 = db.prepareStatement("SELECT id FROM Paketit WHERE seurantakoodi=?");
            PreparedStatement p2 = db.prepareStatement("SELECT count(id) FROM Tapahtumat WHERE seurantakoodi_id=?");
            for(int i=1;i<=1000;i++) {
                String seuranta = "S"+i;
                p1.setString(1,seuranta);
                ResultSet r1 = p1.executeQuery();
                p2.setString(1,r1.getString("id"));
                ResultSet r2 = p2.executeQuery();  
                    while(r2.next()) {
                     //   System.out.println(seuranta+ ": "+r2.getString("count(id)") +" tapahtumaa");
                    }
            }
        } catch (SQLException e) {
            if(e.getErrorCode()==1) {
                System.out.println("VIRHE: Tietokantaa ei ole luotu");
            } else{
                System.out.println("VIRHE: Seurantakoodia ei ole olemassa");
            }    
        }
        s.execute("COMMIT");
    } 
     
}