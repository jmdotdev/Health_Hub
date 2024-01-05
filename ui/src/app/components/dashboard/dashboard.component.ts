import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TimelineModule } from 'primeng/timeline';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,TableModule,TimelineModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  events:any[]=[]
  products: any[] = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
  },
  {
    id: '1001',
    code: 'f230fh0g3',
    name: 'Bamboo',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
}
  ];

  constructor(){
    this.events = [
      { status: 'consultation', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
      { status: 'Treatment', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
      { status: 'meeting', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
      { status: 'clinic', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
      { status: 'consultation', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
      { status: 'meeting', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' }
  ];
  }
}
