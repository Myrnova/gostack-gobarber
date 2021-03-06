import { EntityRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  private appointments: Appointment[];

  public async findByDate(date: Date): Promise<Appointment | null> {
    /*    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    ); */

    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
