import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      specifications,
      id,
    });
    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate,
    });
    return car;
  }
  async findAvaliable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder('c')
      .where('avaliable = :avaliable', { avaliable: true });

    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand });
    }
    if (name) {
      carsQuery.andWhere('name = :name', { name });
    }
    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', { category_id });
    }
    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);
    return car;
  }

  async updateAvaliable(id: string, avaliable: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ avaliable })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };