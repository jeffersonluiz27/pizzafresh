import { ReactComponent as Pencil } from 'assets/icons/edit.svg';
import { useEffect, useState } from 'react';
import { TableResponse } from 'types/api/table';
import * as S from './style';

interface EditTableProps {
	table: TableResponse;
	onCancel: boolean;
	onEdit: (data: TableResponse) => void;
	onDelete: (data: TableResponse) => void;
}

const EditTable = ({ 
	table, 
	onCancel, 
	onDelete, 
	onEdit,
}: EditTableProps) => {
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		setIsEditing(false);
	}, [onCancel]);

	const onEditClick = () => {
		setIsEditing(true);
		onEdit(table);
	};

	const onEditChange = (tableId: string) => {
		setIsEditing(true);
		onEdit({ ...table, number: Number(tableId) });
	};

	return (
		<S.EditTable role="listitem">
			{!isEditing ? (
				<>
					<S.EditTableDetails>
						<S.EditTableDetailsName>{table.number}</S.EditTableDetailsName>
					</S.EditTableDetails>
					<S.EditTableAction onClick={() => onEditClick()}>
						<Pencil /> Editar
					</S.EditTableAction>
				</>
			) : (
				<>
					<label htmlFor="tableId">Número da mesa</label>
					<S.EditForm
						id="tableId"
						type="number"
						placeholder="01"
						onChange={({ target }) => onEditChange(target.value)}
					/>
					<S.Deletar onClick={() => onDelete(table)}>Deletar Mesa</S.Deletar>
				</>
			)}
		</S.EditTable>
	);
};

export default EditTable;
