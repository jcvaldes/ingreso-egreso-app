export class Usuario {
  static fromFirebase({uid, name, email}) {
    return new Usuario(
      uid,
      name,
      email
    );
  }
  constructor(
    public uid: string,
    public nombre: string,
    public email: string
  ) { }
}
