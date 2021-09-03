import { Component } from '@angular/core';
import { Entwickler } from '../model/entwickler';
import { ScrumMaster } from '../model/scrum-master';
import { ProductOwner } from '../model/product-owner';
import { ProjectManager } from '../model/project-manager';
import { Teamleiter } from '../model/teamleiter';
import { Abteilungsleiter } from '../model/abteilungsleiter';
import { Bereichsleiter } from '../model/bereichsleiter';
import { Geschaeftsfuehrer } from '../model/geschaeftsfuehrer';
import { Job } from '../model/Job';
import { SoftwareArchitekt } from '../model/software-architekt';

@Component({
    selector: 'app-main-calc',
    templateUrl: './main-calc.component.html',
    styleUrls: [ './main-calc.component.scss' ]
})
export class MainCalcComponent {

    readonly DEFAULT_MEETINGSTUNDENSATZ = 0;
    readonly DEFAULT_MEETINGKOSTEN = 0;
    readonly DEFAULT_MEETINGDAUER = 1;

    readonly JOB_LIST = new Map<Job, number>([
        [ new Entwickler(), 0 ],
        [ new SoftwareArchitekt(), 0 ],
        [ new ScrumMaster(), 0 ],
        [ new ProductOwner(), 0 ],
        [ new ProjectManager(), 0 ],
        [ new Teamleiter(), 0 ],
        [ new Abteilungsleiter(), 0 ],
        [ new Bereichsleiter(), 0 ],
        [ new Geschaeftsfuehrer(), 0 ]
    ])

    // Büro, Arbeitgeberanteil am Gehalt, Hardware, Software, etc.
    // Wert ist geschätzt
    faktorWeitererUnkosten = 2

    meetingkosten = this.DEFAULT_MEETINGKOSTEN
    meetingdauer = this.DEFAULT_MEETINGDAUER
    meetingstundensatz = this.DEFAULT_MEETINGSTUNDENSATZ

    public berechneMeetingkosten() {
        let newMeetingkosten = 0

        this.JOB_LIST.forEach((anzahl: number, job: Job) => {
            newMeetingkosten = newMeetingkosten + ((job.stundensatz * this.meetingdauer * anzahl) * this.faktorWeitererUnkosten)
        })

        this.meetingkosten = newMeetingkosten;
    }

    public addTeilnehmerToJob(job: Job) {
        this.JOB_LIST.set(job, this.JOB_LIST.get(job)!.valueOf() + 1)

        this.berechneMeetingkosten()
    }

    public subtractTeilnehmerFromJob(job: Job) {
        let currentTeilnehmerAnzahl = this.JOB_LIST.get(job)!.valueOf()

        if (currentTeilnehmerAnzahl > 0) {
            this.JOB_LIST.set(job, this.JOB_LIST.get(job)!.valueOf() - 1)

            this.berechneMeetingkosten()
        }
    }

    public addMeetingdauerInIncrements() {
        this.meetingdauer = this.meetingdauer + 0.25

        this.berechneMeetingkosten()
    }

    public subtractMeetingdauerInIncrements() {
        if (this.meetingdauer > 0) {
            this.meetingdauer = this.meetingdauer - 0.25

            this.berechneMeetingkosten()
        }
    }

    public resetAllTeilnehmer() {
        this.JOB_LIST.forEach((anzahl: number, job: Job) => {
            this.JOB_LIST.set(job, 0)
        })

        this.meetingkosten = this.DEFAULT_MEETINGKOSTEN
        this.meetingdauer = this.DEFAULT_MEETINGDAUER
        this.meetingstundensatz = this.DEFAULT_MEETINGSTUNDENSATZ;
    }
}
