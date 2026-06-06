const supabaseUrl = "https://emhojhrdwiitlqkdblxa.supabase.co";

const supabaseKey = "sb_publishable_M4ooOjAUewjS8p3r7G-KwA_Ks9Gmpr2";

const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

console.log("Supabase conectado correctamente");

console.log(supabase);