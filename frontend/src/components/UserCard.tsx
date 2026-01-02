import type { IPersona } from "../../../shared/types/persona";

const UserCard = ({ person }: { person: IPersona }) => {
    return (
        <div className="bg-gray-500 box-border px-3 py-2">
            <p className="text-lg text-white">{person.first_name} {person.last_name}</p>
            <p className="text-sm text-white">Edad: {person.age}</p>
            <p className="text-sm text-white">País: {person.country}</p>
            <p className="text-sm text-white">Email: {person.email}</p>
            <p className="text-sm text-white">Empresa: {person.company}</p>
        </div>
    );
};

export default UserCard;
