// api/postback.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.https://tzxofwsnrnipdwmltaao.supabase.co, process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6eG9md3Nucm5pcGR3bWx0YWFvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTUzNTY4NCwiZXhwIjoyMDk3MTExNjg0fQ.06dlo0Mt5zFpKSv5HpksZSGsEOsy1XWiXSWQk9M8J2w);

export default async function handler(req, res) {
  // Récupérer les paramètres envoyés par la régie (ex: ?user_id=123&amount=0.50)
  const { user_id, amount } = req.query;

  if (!user_id || !amount) {
    return res.status(400).json({ error: 'Données manquantes' });
  }

  // Mettre à jour le solde dans Supabase
  const { error } = await supabase
    .from('users')
    .update({ balance: supabase.sql`balance + ${amount}` })
    .eq('id', user_id);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ status: 'success' });
}
