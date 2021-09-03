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

    meetingkosten = 0

    constructor() {
    }

    public berechneMeetingkosten() {
        let newMeetingkosten = 0

        this.JOB_LIST.forEach((anzahl: number, job: Job) => {
            newMeetingkosten = newMeetingkosten + (job.stundensatz * anzahl)
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
        }

        this.berechneMeetingkosten()
    }

    public resetAllTeilnehmer() {
        this.JOB_LIST.forEach((anzahl: number, job: Job) => {
            this.JOB_LIST.set(job, 0)
        })

        this.meetingkosten = 0
    }
}
