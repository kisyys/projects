package tietokanta;

import java.sql.SQLException;
import java.util.Scanner;

public class UI {

    public static void main(String[] args) throws SQLException {
        Scanner input = new Scanner(System.in);       
        Tietokanta t = new Tietokanta();
        System.out.println("Toiminnot:");
        System.out.println("0 - lopettaa");
        System.out.println("1 - luo tietokannan");
        System.out.println("2 - lisää paikan");
        System.out.println("3 - lisää asiakkaan");
        System.out.println("4 - lisää paketin");
        System.out.println("5 - lisää tapahtuman");
        System.out.println("6 - hakee paketin tapahtumat");
        System.out.println("7 - hakee asiakkaan paketit ja tapahtumamäärät");
        System.out.println("8 - hakee paikan tapahtumamäärät tiettynä päivämääränä");
        System.out.println("9 - ajaa tehokkuustestit (mahdollista tehdä vain kerran)");
          
        while(true) {
            System.out.print("Anna toiminto: ");
            String toiminto = input.nextLine();
            
            if(toiminto.equals("0")) {
                System.out.println("Hei Hei");
                break;  
            }  
            
            if(toiminto.equals("1")) {
                t.luonti();     
            }
            
            if(toiminto.equals("2")) {
                System.out.print("Anna paikan nimi: ");
                String paikka = input.nextLine();
                t.paikka(paikka);    
            }
            
            if(toiminto.equals("3")) {
                System.out.print("Anna asiakkaan nimi: ");
                String asiakas = input.nextLine();
                t.asiakas(asiakas);      
            }
            
            if(toiminto.equals("4")) {
                System.out.print("Anna paketin seurantakoodi: ");
                String seurantakoodi = input.nextLine();
                System.out.print("Anna asiakkaan nimi: ");
                String asiakas = input.nextLine();
                t.paketti(seurantakoodi,asiakas);         
            }
            
            if(toiminto.equals("5")) {
                System.out.print("Anna paketin seurantakoodi: ");
                String seurantakoodi = input.nextLine();
                System.out.print("Anna tapahtuman paikka: ");
                String paikka = input.nextLine();
                System.out.print("Anna tapahtuman kuvaus: ");
                String kuvaus = input.nextLine();
                t.tapahtuma(seurantakoodi,paikka,kuvaus);                    
            }

            if(toiminto.equals("6")) {
                System.out.print("Anna paketin seurantakoodi: ");
                String seurantakoodi = input.nextLine();
                t.haku(seurantakoodi);
            }
            
            if(toiminto.equals("7")) {
                System.out.print("Anna asiakkaan nimi: ");
                String animi = input.nextLine();
                t.asiakastapahtumat(animi);
            }
            
            if(toiminto.equals("8")) {
                System.out.print("Anna paikan nimi: ");
                String pnimi = input.nextLine();
                System.out.print("Anna paivays (muodossa pp.kk.vvvv): ");
                String paiva = input.nextLine();
                t.paikkatapahtumat(pnimi,paiva);
            }
             
            if(toiminto.equals("9")) {
                long alku1 = System.nanoTime();
                t.t1paikka();
                long loppu1 = System.nanoTime();
                System.out.println("Tehokkuustestin 1 tulos: "+((loppu1-alku1)/1e9)+" s, kun lisättiin 1000 paikkaa");
                
                long alku2 = System.nanoTime();
                t.t2asiakas();
                long loppu2 = System.nanoTime();
                System.out.println("Tehokkuustestin 2 tulos: "+((loppu2-alku2)/1e9)+" s, kun lisättiin 1000 asiakasta");
                
                long alku3 = System.nanoTime();
                t.t3paketti();
                long loppu3 = System.nanoTime();
                System.out.println("Tehokkuustestin 3 tulos: "+((loppu3-alku3)/1e9)+" s, kun lisättiin 1000 pakettia");
                
                long alku4 = System.nanoTime();
                t.t4tapahtuma();
                long loppu4 = System.nanoTime();
                System.out.println("Tehokkuustestin 4 tulos: "+((loppu4-alku4)/1e9)+" s, kun lisättiin 1000000 tapahtumaa");
                
                long alku5 = System.nanoTime();
                t.t5asiakaspaketit();
                long loppu5 = System.nanoTime();
                System.out.println("Tehokkuustestin 5 tulos: "+((loppu5-alku5)/1e9)+" s, kun suoritettiin 1000 kyselyä asiakkaan pakettimääristä");
                
                long alku6 = System.nanoTime();
                t.t6pakettitapahtumat();
                long loppu6 = System.nanoTime();
                System.out.println("Tehokkuustestin 6 tulos: "+((loppu6-alku6)/1e9)+" s, kun suoritettiin 1000 kyselyä pakettien tapahtumamääristä"); 
            }
            
            if(toiminto.equals("12")) {
            long alku5 = System.nanoTime();
                t.t6pakettitapahtumat();
                long loppu5 = System.nanoTime();
                System.out.println("Aikaa kului: "+((loppu5-alku5)/1e9)+" s, kun suoritettiin 1000 kyselyä asiakkaan pakettien määristä");
            }
        }
    } 
}