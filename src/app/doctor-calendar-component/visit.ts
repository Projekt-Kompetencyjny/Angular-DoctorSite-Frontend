export class Visit {
    reservationId: string
    symptoms: string
    diagnosis: string
    prescribedMedications: string
    takingMedications: string
    recommendations: string

    constructor(rId: string, sym: string, dia: string, med: string, tak: string, rec: string) {
        this.reservationId = rId;
        this.symptoms = sym;
        this.diagnosis = dia;
        this.prescribedMedications = med;
        this.takingMedications = tak;
        this.recommendations = rec;
    }
}