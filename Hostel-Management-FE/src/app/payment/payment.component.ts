import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  visible: boolean = false;

  constructor(private message: NzMessageService) {}

  onCancle(): void {
    this.visible = false;
  }

  ngOnInit(): void {
    this.visible = false;
    render({
      id: '#myPaypalButtons',
      currency: 'USD',
      value: '50.00',
      onApprove: (details) => {
        this.message.success('Payment Successfull!');
        console.log('payment', details);
        this.visible = true;
      },
    });
  }
}
