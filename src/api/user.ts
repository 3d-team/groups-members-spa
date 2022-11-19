class User {
  static async getUserById(id: string) {
    return {
      id: id,
      name: 'Nguyen Van A',
      age: 21,
      dob: '20-11-2000',
    };
  }
}

export default User;
