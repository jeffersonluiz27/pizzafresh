import { ReactComponent as Market } from 'assets/icons/market.svg';
import { ReactComponent as Info } from 'assets/icons/info.svg';
import { ReactComponent as Users } from 'assets/icons/users.svg';
import * as S from './style';
import { RoutePath } from 'types/routes';
import NavColumnItem from 'components/NavColumnItem';
import { HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';

type NavColumnType = HTMLAttributes<HTMLDivElement>;

type NavColumnProps = {
	activeRoute: RoutePath;
} & NavColumnType;

const NavColumn = ({ activeRoute }: NavColumnProps) => {
	const navigate = useNavigate();
	
	const items = [
		{
			icon: <Market />,
			title: 'Customize suas mesas',
			subtitle: 'Adicione mesas, configure nomes',
			navigation: RoutePath.SETTINGS_TABLES,
		},
		{
			icon: <Info />,
			title: 'Gerenciar Produtos',
			subtitle: 'Edite os pratos, preços e etc.',
			navigation: RoutePath.SETTINGS_PRODUCTS,
		},
		{
			icon: <Users />,
			title: 'Gerenciar Usuários',
			subtitle: 'Gerencie o acesso ao sistema',
			navigation: RoutePath.SETTINGS_USERS,
		},
	];
	return (
		<S.NavColumn>
			{items.map((i, key) => (
				<NavColumnItem
					onClick={() => navigate(i.navigation)}
					active={i.navigation === activeRoute}
					icon={i.icon}
					title={i.title}
					key={key}
					subtitle={i.subtitle}
				/>
			))}
		</S.NavColumn>
	);
};

export default NavColumn;
