async function createHospital(data) {
  const { name, phone, address, description, image } = data;

  // Just create the hospital with empty departments
  const hospital = await Hospital.create({
    name,
    phone,
    address,
    description,
    image,
    departments: [] // optional, if your schema defaults it
  });

  return hospital;
}