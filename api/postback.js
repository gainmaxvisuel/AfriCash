import { createClient } from '@supabase/supabase-js';

// Lecture sécurisée des variables définies dans Vercel
const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { user_id, amount } = req.query;

  if (!user_id || !amount) {
    return res.status(400).json({ error: 'Données manquantes' });
  }

  // Utilisation de .rpc pour appeler une fonction de base de données sécurisée
  const { error } = await supabase.rpc('crediter_solde', { 
    p_user_id: parseInt(user_id), 
    p_amount: parseFloat(amount) 
  });

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ status: 'success' });
}
