const supabaseUrl = "https://emhojhrdwiitlqkdblxa.supabase.co";

const supabaseKey = "sb_publishable_M4ooOjAUewjS8p3r7G-KwA_Ks9Gmpr2";

// Cambiamos el nombre de la variable
const supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

console.log("Conectado");
console.log(supabaseClient);