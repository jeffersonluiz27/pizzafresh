import { ReactComponent as Pencil } from 'assets/icons/edit.svg';
import { useEffect, useState } from 'react';
import { User, UserResponse, UserUpdate } from 'types/api/user';
import * as S from './style';

interface EditUserProps {
	user: UserResponse;
	onCancel: boolean;
	onDelete: (data: UserResponse) => void;
	onEdit: (data: UserUpdate) => void
}

const EditUser = ({
	user,
	onCancel,
	onDelete,
	onEdit,
}: EditUserProps) => {
	
	const [isEditing, setIsEditing] = useState(false);

	const form = {
		id: user.id,
		nick: user.nickname,
		name: user.name,
		image: user.image,
		pass: "",
		passConfirm: "",
	}

	const [state, setState] = useState(form);

	const userEditFormatter = (toFormat: typeof form): User => ({
		nickname: toFormat.nick,
		name: toFormat.name,
		password: toFormat.pass,
		confirmPassword: toFormat.passConfirm,
		image: toFormat.image,
	});

	const handleChange = (name: string, value: string) => {
		setState({ ...state, [name]: value});
		const userFormatted = {user: userEditFormatter(state), id: user.id};
		onEdit(userFormatted);
	};

	const onEditClick = () => {
		setIsEditing(true);
		const userFormatted = {user: userEditFormatter(state), id: user.id};
		onEdit(userFormatted);
	}

	useEffect(() => {
		setIsEditing(false);
	},[onCancel]);

	return (
		<S.EditUser role={'listitem'}>
			{!isEditing ? (
			<>
				<S.EditUserDetails>
					<S.EditUserDetailsImageWrap>
						<S.EditUserDetailsImage src={user.image} alt={`Foto de ${user.name}`} />
					</S.EditUserDetailsImageWrap>
					<S.EditUserDetailsTitle>{user.name}</S.EditUserDetailsTitle>
					<S.EditUserDetailsText>
						<b>usuário: </b> {user.nickname}
					</S.EditUserDetailsText>
				</S.EditUserDetails>

				<S.EditUserAction onClick={() => onEditClick()}>
					<Pencil /> Editar
				</S.EditUserAction>
			</>
			) : (
			<S.EditFormGroup>
				<S.EditForm 
					type="text" 
					placeholder="Nome" 
					value={state.name}
					onChange={({target}) => handleChange("name", target.value)}
				/>
				<S.EditForm 
					type="text" 
					placeholder="Nome de usuário" 
					value={state.nick}
					onChange={({target}) => handleChange("nick", target.value)}
				/>
				<S.EditForm 
					type="password" 
					placeholder="Senha" 
					value={state.pass}
					onChange={({target}) => handleChange("pass", target.value)}
				/>
				<S.EditForm 
					type="password" 
					placeholder="Confirmar Senha" 
					error={Boolean(
						state.passConfirm.length &&
						state.pass.length &&
						state.pass !== state.passConfirm
					)}
					value={state.passConfirm}
					onChange={({target}) => handleChange("passConfirm", target.value)}
				/>
				<S.EditForm 
					type="url" 
					placeholder="Imagem" 
					value={state.image}
					onChange={({target}) => handleChange("image", target.value)}
				/>
				<S.Delete onClick={() => onDelete(user)}>Deletar</S.Delete>
			</S.EditFormGroup>
			)}
		</S.EditUser>
	);
};

export default EditUser;
