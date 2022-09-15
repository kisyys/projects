import java.io.File;
import java.util.ArrayList;
import java.util.Scanner;

public class RecipeCreator {
    public static void main(String[] args) {
        Scanner lukija = new Scanner(System.in); 
        try (Scanner tiedostonLukija = new Scanner(new File("RecipeFormat.txt"))) {
            String reseptinNimi = "";
            String annosAika = "";
            String aineet = "";
            String raakaAine = "";
            String resepti = "";
            String ohje = "<br> <button onclick=lisaaListaan()>Lisää listaan</button> <br> <br> <br> <b> Valmistusohje </b> <br> ";
            int y = 0;
            while (tiedostonLukija.hasNextLine()) {
                reseptinNimi = tiedostonLukija.nextLine();
                annosAika = "\"" + tiedostonLukija.nextLine() + " <br> <br> <b> Aineet </b> <br> ";
                aineet = tiedostonLukija.nextLine();
                int i = 0;
                while (tiedostonLukija.hasNextLine()) { 
                    String rivi = tiedostonLukija.nextLine(); 
                    String[] palat = rivi.split(" ");
                    String osa = "";
                    if(palat[0].equals("Valmistusohje")) {
                            y=1;
                    } else if (y==0) {
                        for(int x = 0; x<palat.length;x++) {   
                            if(x==palat.length-1) {
                                osa = osa + palat[x]+"> " + rivi+ " <br>";
                            }   
                             else {
                                osa=  osa + palat[x]+"&nbsp;";
                            }
                        }
                        raakaAine = raakaAine + "<input type=checkbox id=" + reseptinNimi + "_tick"+ i + " value=" + osa  ;
                        i++;
                        if (raakaAine.isEmpty()) {
                            break;
                        }
                    } else {
                        ohje = ohje + rivi + " <br>  <br> ";  
                    }
                }
            }
            System.out.println("document.getElementById(\"food1\").innerHTML = \""+reseptinNimi+"\";");
            System.out.println("document.getElementById(\"food2\").innerHTML = \""+reseptinNimi+"\";");
            System.out.println("");
            System.out.println("document.getElementById(\"instructions\").innerHTML =");
            System.out.println("");
            System.out.println(annosAika + " " + raakaAine + " " + ohje + "\";");
            System.out.println("");
            System.out.println("document.getElementById(\"pic00\").src = \""+reseptinNimi+".jpg\";");
            System.out.println("");
            System.out.println("clear();");
            System.out.println("");
        } catch (Exception e) {
            System.out.println("Virhe: " + e.getMessage());
        }    
    }
}