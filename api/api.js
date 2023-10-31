
// app.get('/items', async (req, res) => {
//     try {
//       const result = await sql.query`SELECT * FROM emoloyees`; // Replace "YourTable" with your table name
//       const a=result.recordset
//     } catch (err) {
//       console.error('Error fetching data', err);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
const config=require("../database")
const sql=require("mssql")


  export const checkUser  = async(req, res)=>{
    const pool = await sql.connect(config)
      try {
          const result = await pool.request()
            .input('USER_NAME', sql.VarChar(20), req.body.username)
            .input('PASSWORD', sql.VarChar(10), req.body.password)
            .execute('AST_SP_CHECK_USER')
      
          const checklogin = result.recordset;
          if (checklogin && checklogin.length > 0) {
              const token = jwt.sign({ user: checklogin[0] },key,{expiresIn: "2h"});
              res.status(200).send({ success: true, data:checklogin[0], token: token , message: 'Login Successful.!' })
               } else {
            res.status(404).send({ success: false, data: null, message: "Invalid username or password" })
          }
        } catch (err) {
          console.log(err);
          res.status(500).send({ success: false, data: err })
        }
        finally{
          await pool.close()
        }
  }