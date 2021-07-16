
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { EmployersComponent } from 'app/employers/employers.component';
import { UnServiceComponent } from 'app/un-service/un-service.component';
import { BulletinComponent } from 'app/bulletin/bulletin.component';
import { AuthguardService } from '../../service/authguard.service';
import { BonCommandeComponent } from '../../bon-commande/bon-commande.component';
import { HistoriqueComponent } from '../../historique/historique.component';
import { HopitalComponent } from 'app/hopital/hopital.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: '', component: DashboardComponent, canActivate : [AuthguardService] },
    { path: 'Services', component: DashboardComponent, canActivate : [AuthguardService]},
    { path: 'Profile', component: UserProfileComponent, canActivate : [AuthguardService] },
    { path: 'Commandes', component: TableListComponent, canActivate : [AuthguardService]},
    { path: 'Commandes/bon/:id', component : BonCommandeComponent , canActivate : [AuthguardService]} ,
    { path: 'Commandes/historique/:id', component : HistoriqueComponent, canActivate : [AuthguardService]} ,
    { path: 'typography', component: TypographyComponent, canActivate : [AuthguardService] },
    { path: 'icons', component: IconsComponent, canActivate : [AuthguardService] },
    { path: 'maps', component: MapsComponent, canActivate : [AuthguardService] },
    { path: 'Notifications', component: NotificationsComponent },
    { path: 'Hopital', component: HopitalComponent },
    {path: 'Services/:id/employer/:id/bulletin/:id',component: BulletinComponent},
    { path: 'Services/:id', component: UnServiceComponent, canActivate : [AuthguardService]  },
    { path: 'Services/:id/employer/:id', component: EmployersComponent , canActivate : [AuthguardService]},
    { path: 'Services/:id/employer/:id/bulletin/:id',component: BulletinComponent , canActivate : [AuthguardService]},
];
