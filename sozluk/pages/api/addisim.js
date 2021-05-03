// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'


export default async (req, res) => {



  const data = await fs.readFile('isim.json', function (err, data) {
    if (err) return res.status(404).json({ state: false});
    
      /* kaydedelim */
      fs.writeFile('isim.json', JSON.stringify([...JSON.parse(data),...req.body.arr]), function (err) {
        if (err) return res.status(404).json({ state: false});
        res.status(200).json({ state: true})
      });

  });

  /*

  */
}
