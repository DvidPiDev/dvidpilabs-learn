export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const id = req.query.id;
      if (!id) {
        return res.status(400).json({ error: 'Bad request' });
      }

      const imageUrl = `http://localhost:3000/static/${id}.png`;
      const response = await fetch(imageUrl);
      const imageData = await response.arrayBuffer();
      const buffer = Buffer.from(imageData);

      res.setHeader('Content-Type', 'image/png');
      res.status(200).send(buffer);
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Failed to fetch image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}