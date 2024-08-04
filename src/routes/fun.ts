import { Hono } from 'hono'

const Fun = new Hono()

Fun.get('/khodam', (c) => {
  const name = c.req.query('name');

  if (!name) {
    return c.json({ error: 'Name parameter is required' }, 400);
  }

  try {
    const khodamList = ['Naga Api', 'Anjing', 'Kambing', 'Kera Sakti', 'Kuntilanak Merah', 'Adolf Hitler', 'Buaya Albino', 'Harimau Putih', 'Ikan Paus', 'Serigala Kepala 3', 'Pocong Atletik', 'Isaac Newton', 'Monyet Ekor Panjang', 'Badak Sumatera', 'Alien Kepala Kotak', 'Buaya Darat', 'Keong Mas', 'Ice Bear', 'Sangkuriang', 'Raja Iblis', 'Malin Kundang', 'Koruptor', 'Sampah', 'Pencabut Nyawa', 'Kalajengking', 'Hiu Raksasa', 'Babi Rakus', 'Asep Mangga', 'Ular Putih', 'Naga Es', 'Psikopat', 'Necromancer', 'Pendekar', 'Penyihir', 'Pemanah', 'Keris Siamang Tunggal', 'Kasihan, gak punya khodam :)', 'Tok Dalang', 'Titan', 'Dwarf', 'Dewa Perang', 'Kroco Iblis', 'NPC', 'Penembak Jitu', 'Tong Kosong', 'Kura Kura Ninja', 'Kucing Oyen', 'Orang Gila'];

    const randomIndex = Math.floor(Math.random() * khodamList.length);
    const khodam = khodamList[randomIndex];

    return c.json({ name, khodam });
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Error reading khodam data' }, 500);
  }
})

export { Fun }