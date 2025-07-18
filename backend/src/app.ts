import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { usuarioRouter } from './usuario/usuario.route.js';
import { tareaRouter } from './tarea/tarea.route.js';
import { servicioRouter } from './servicio/servicio.route.js';
import { turnoRouter } from './turno/turno.route.js';
import 'reflect-metadata';
import { orm, syncSchema } from './shared/db/orm.js';
import { zonaRouter } from './zona/zona.route.js';
import { RequestContext } from '@mikro-orm/core';
import { serviceTypeRouter } from './tipoServicio/tipoServ.route.js';
import { horarioRouter } from './horario/horario.routes.js';

const app = express();

// cors lo que hace es dar el permiso al un puerto para hacer las peticiones al back
app.use(
  cors({
    origin: 'http://localhost:5173', // El puerto de tu frontend al que le deja hacer peticiones
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next: NextFunction) => {
  RequestContext.create(orm.em, next);
});

app.use('/api/serviceTypes', serviceTypeRouter);
app.use('/api/usuario', usuarioRouter);
app.use('/api/tarea', tareaRouter);
app.use('/api/servicio', servicioRouter);
app.use('/api/turno', turnoRouter);
app.use('/api/horario', horarioRouter);
app.use('/api/zona', zonaRouter);

// app.use((req, res) => {
//   console.log(req)
//   return res.status(404).send({ message: 'Resource not found' });
// }); comente esto pq me tiraba error

await syncSchema(); //nunca en producción

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/');
});

/* app.listen(3000, () => {
    console.log('Server runnning on http://localhost:3000');
  }); */
