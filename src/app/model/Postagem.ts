// Importação de classes da model
import { Tema } from './Tema';
import { User } from './User';

// Classe do back-end que vai ser exportada
export class Postagem {
    public id: number
    public texto: string
    public imagem: string
    public data: Date

    // Relacionamento entre as classes
    public user: User
    public tema: Tema
}