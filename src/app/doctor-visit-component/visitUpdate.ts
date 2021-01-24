export class VisitUpdate {
    symptoms: string
    diagnosis: string
    prescribedMedications: string
    takingMedications: string
    recommendations: string

    constructor(sym: string, dia: string, med: string, tak: string, rec: string) {
        this.symptoms = sym;
        this.diagnosis = dia;
        this.prescribedMedications = med;
        this.takingMedications = tak;
        this.recommendations = rec;
    }
}