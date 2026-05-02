import { Router } from 'express'
import { supabase } from '../config/supabase.js'

const router = Router()

router.get('/', async (req, res) => {
  const userId = req.headers['x-user-id']
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .or(`owner_id.eq.${userId},collaborators.user_id.eq.${userId}`)

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

router.post('/', async (req, res) => {
  const { name, ownerId, isPublic = false } = req.body
  if (!name || !ownerId) return res.status(400).json({ error: 'Missing name or ownerId' })

  const { data, error } = await supabase
    .from('projects')
    .insert({ name, owner_id: ownerId, is_public: isPublic })
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
})

export default router
