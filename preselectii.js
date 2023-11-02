const express = require('express');
const mysql = require('mysql2/promise'); 

const app = express();
const port = 3000;


const dbConfig = {
  host: 'localhost', 
  user: 'root',      
  password: '',     
  database: 'formulardata'
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/preselectii', async (req, res) => {
  try {
    const { RName, RSurname, REmail, RTelefon, RPlata } = req.body;


    const connection = await mysql.createConnection(dbConfig);

  
    await connection.execute('INSERT INTO datacolectata (RName, RSurname, REmail, RTelefon, RPlata) VALUES (?, ?, ?, ?, ?)', [RName, RSurname, REmail, RTelefon, RPlata]);

    
    connection.end();

    res.send('Datele au fost salvate cu succes în baza de date.');
  } catch (error) {
    console.error('Eroare:', error);
    res.status(500).send('A apărut o eroare la salvarea datelor în baza de date.');
  }
});

// Pornirea serverului
app.listen(port, () => {
  console.log(`Serverul rulează pe portul ${port}`);
});