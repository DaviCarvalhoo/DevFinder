const express = require('express')
const cors = require('cors')
const { linkedin } = require('./linkedin');
const { empregos } = require('./empregos');

const app = express();
const PORT = 3000;

app.use(cors())

app.get('/jobs/:vaga', async (req, res) => {
  const vaga = req.params.vaga;

  try {
    const [resultLinkedin, resultEmpregos] = await Promise.all([
      linkedin(vaga),
      empregos(vaga)
    ]);

    const resultados = [...resultLinkedin, ...resultEmpregos];
    res.json(resultados);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching posts",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/jobs/`);
});
