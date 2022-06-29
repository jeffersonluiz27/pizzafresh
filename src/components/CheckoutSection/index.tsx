import CheckboxIcon from 'components/CheckboxIcon';
import OrderConfirmation from 'components/OrderConfirmation';

import { ReactComponent as Card } from 'assets/icons/credit-card.svg';
import { ReactComponent as Cash } from 'assets/icons/wallet.svg';

import * as S from './style';

const CheckoutSection = () => {
	return (
		<S.CheckoutSection closing={false}>
			<S.CheckoutSectionConfirmation>
				<S.BackIcon />
				<OrderConfirmation />
			</S.CheckoutSectionConfirmation>
			<S.CheckoutSectionPayment>
				<S.CheckoutSectionPaymentHead>Pagamento</S.CheckoutSectionPaymentHead>
				<S.CheckoutSectionPaymentSub>
					2 métodos de pagamento disponíveis
				</S.CheckoutSectionPaymentSub>
				<S.CheckoutSectionPaymentForm>
					<S.CheckoutSectionPaymentFormTitle>
						Método de Pagamento
					</S.CheckoutSectionPaymentFormTitle>
					<S.PaymentForm>
						<S.PaymentFormCheckbox>
							<CheckboxIcon active={true} value="Cartão" icon={<Card />} />
							<CheckboxIcon active={false} value="Dinheiro" icon={<Cash />} />
						</S.PaymentFormCheckbox>
						<>
							<S.PaymentFormGroup>
								<label htmlFor="titular">Titular do cartão</label>
								<input
									type="text"
									name="titular"
									id="titular"
									placeholder="Wheslley Rimar"
								/>
							</S.PaymentFormGroup>

							<S.PaymentFormGroup>
								<label htmlFor="card">Número do cartão</label>
								<input
									type="text"
									name="card"
									id="card"
									placeholder="2564 1421 0897 1244"
								/>
							</S.PaymentFormGroup>

							<S.PaymentFormHalf>
								<S.PaymentFormHalfItem>
									<label htmlFor="validity">Validade</label>
									<input
										type="text"
										name="card"
										id="validity"
										placeholder="05/2022"
									/>
								</S.PaymentFormHalfItem>
								<S.PaymentFormHalfItem>
									<label htmlFor="cvv">CVV</label>
									<input type="text" name="cvv" id="cvv" placeholder="140" />
								</S.PaymentFormHalfItem>
							</S.PaymentFormHalf>
						</>
					</S.PaymentForm>
				</S.CheckoutSectionPaymentForm>
				<S.PaymentActions>
					<S.PaymentActionsDetails>
						<S.PaymentActionsDetailsOrderType>
							<label htmlFor="card">Tipo de pedido</label>
							<select>
								<option>{''}</option>
							</select>
						</S.PaymentActionsDetailsOrderType>
						<S.PaymentActionsDetailsTableNumber>
							<label htmlFor="card">Número da mesa</label>
							<input
								type="text"
								name="table"
								id="table"
								placeholder="07"
								disabled
								value={''}
							/>
						</S.PaymentActionsDetailsTableNumber>
					</S.PaymentActionsDetails>

					<S.PaymentActionsButtonGroup>
						<S.PaymentActionsButtonGroupCancel>
							Cancelar
						</S.PaymentActionsButtonGroupCancel>
						<S.PaymentActionsButtonGroupConfirm>
							Confirmar Pagamento
						</S.PaymentActionsButtonGroupConfirm>
					</S.PaymentActionsButtonGroup>
				</S.PaymentActions>
			</S.CheckoutSectionPayment>
		</S.CheckoutSection>
	);
};

export default CheckoutSection;
