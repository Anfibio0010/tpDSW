import { Request, Response, NextFunction } from 'express';
import { Zona } from './zona.entity.js';
import { request } from 'http';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

function sanitizeZonaInput(req: Request, res: Response, next: NextFunction) {
  if (!req.body) req.body = {};
  req.body.sanitizeZonaInput = {
    descripcionZona: req.body.descripcionZona,
    usuarios: req.body.usuarios, // Assuming usuarios is an array of user IDs
  };

  Object.keys(req.body.sanitizeZonaInput).forEach((key) => {
    if (req.body.sanitizeZonaInput[key] === undefined) {
      delete req.body.sanitizeZonaInput[key];
    }
  });

  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const zona = await em.find(Zona, {}, { populate: ['usuarios'] });
    res.status(200).json({ message: 'find all zonas exitoso', data: zona });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function add(req: Request, res: Response) {
  try {
    const zona = em.create(Zona, req.body.sanitizeZonaInput);
    await em.flush();
    res.status(201).json({ message: 'zona creada', data: zona });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function findOne(req: Request, res: Response) {
  try {
    const codZona = Number.parseInt(req.params.id);
    const zona = await em.findOneOrFail(
      Zona,
      { id: codZona },
      { populate: ['usuarios'] }
    );
    res.status(200).json({ message: 'found zon', data: zona });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function update(req: Request, res: Response) {
  try {
    const codZona = Number.parseInt(req.params.id);
    const zonaToUpdate = await em.findOneOrFail(Zona, { id: codZona });
    em.assign(zonaToUpdate, req.body.sanitizeZonaInput);
    await em.flush();
    res.status(200).json({ message: 'zona actualizada', data: zonaToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function remove(req: Request, res: Response) {
  try {
    const codZona = Number.parseInt(req.params.id);
    const zona = await em.findOneOrFail(Zona, { id: codZona }); //el get reference no funciona porque no lee correctamente codZona, utilizo esto y funciona capaz
    await em.removeAndFlush(zona);
    res.status(200).json({ message: 'zona eliminada' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
export { findAll, findOne, add, update, remove, sanitizeZonaInput };
