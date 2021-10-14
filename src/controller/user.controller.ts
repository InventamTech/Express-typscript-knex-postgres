import { StatusCodes } from 'http-status-codes';
import { user } from "../model/index";
import { Request, Response } from 'express';
import { responseGenerators } from "../lib/utils"
import logger from '../lib/logger';
import { error } from 'winston';

export const findAll = async (req: Request, res: Response) => {
  try {
    await user.findAll().then(results => {
      if (results) {
        return res.status(StatusCodes.OK).send(responseGenerators(results, StatusCodes.OK, 'User data fetched successfully', false))
      }
    }).catch(error => {
      logger.log({
        level: 'error',
        message: 'Error while fetch user data' + error
      });
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, 'Error while adding user detail', true))
    });
  } catch (error) {
    logger.log({
      level: 'error',
      message: 'Error while fetch user data' + error
    });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, 'Error while fetch User data', true))
  }
}


export const create = async (req: Request, res: Response) => {
  try {
    let userData = req.body;
    await user.create(userData).then(results => {
      if (results) {
        return res.status(StatusCodes.OK).send(responseGenerators(results, StatusCodes.OK, 'user data added successfully!', false))
      }
      else {
        return res.status(StatusCodes.OK).send(responseGenerators(null, StatusCodes.INTERNAL_SERVER_ERROR, 'Registration failed; Please try again', true));
      }
    }).catch(error => {
      logger.log({
        level: 'error',
        message: 'Error while adding user detail' + error
      });
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, 'Error while adding user detail', true))
    });
  } catch (error) {
    logger.log({
      level: 'error',
      message: 'Error while adding user detail' + error
    });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, 'Error while adding user detail', true))
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { name, mobile, email, password } = req.body;
    await user.update({ id: userId },
      {
        name,
        mobile,
        email,
        password
      }).then(results => {
        if (results) {
          return res.status(StatusCodes.OK).send(responseGenerators(results, StatusCodes.OK, 'User detail updated successfully', false))
        }
      }).catch(error => {
        logger.log({
          level: 'error',
          message: 'Error while update User detail' + error
        });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, 'Error while update User detail', true))
      });
  } catch (error) {

  }
}


export const findById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await user.findById(userId).then(results => {
      if (results) {
        return res.status(StatusCodes.OK).send(responseGenerators(results, StatusCodes.OK, 'User data fetched successfully', false))
      }
    }).catch(error => {
      logger.log({
        level: 'error',
        message: 'Error while fetch user data' + error
      });
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, 'Error while fetch User data', true))
    });
  } catch (error) {
    logger.log({
      level: 'error',
      message: 'Error while fetch user data' + error
    });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, 'Error while fetch User data', true))
  }
}

export const userDelete = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await user.destroy(userId).then(results => {
      logger.log({
        level: 'info',
        message: 'User detail deleted successfully'
      })
      return res.status(StatusCodes.OK).send(responseGenerators({}, StatusCodes.OK, 'User detail deleted successfully', false))
    }).catch(error => {
      logger.log({
        level: 'error',
        message: 'Error while delete user data' + error
      });
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, 'Error while delete user data', true))
    });
  } catch (error) {
    logger.log({
      level: 'error',
      message: 'Error while delete user data' + error
    });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, 'Error while delete user data', true))
  }
}