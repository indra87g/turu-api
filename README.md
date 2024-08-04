# Turu API

Read english documentation [here](https://turu-api.surge.sh)

Kumpulan REST API berguna untuk aplikasi anda.

## Fitur
* 10+ API
* Performa cepat

## Tech Stack
* Hono (Backend)
* Bun (Runtime)
* Cloudflare KV (Deployer)
* Cloudflare D1 (Database)
* SQLite (Database)

## Penggunaan

Untuk memulai, silakan kunjungi (https://turu-api.girsang395.workers.dev)

### Contoh
```
https://website.domain/RUTE/SUBRUTE?VARIABLE=sesuatu
```
**Dimana:**
* RUTE = ```/math``` dan sebagainya
* SUBRUTE = ```/math/add``` dan sebagainya
* VARIABLE = ```/fun/khodam?name=YOUR_NAME``` dan sebagainya

### ```/``` Rute Utama
* ```/name/YOUR_NAME```, Menampilkan pesan sambutan
* ```/info```, Menampilkan informasi REST API

### ```/math``` Rute Fungsi Matematika
* ```/add?num1=NUMBER&num2=NUMBER```, Melakukan penjumlahan

### ```/fun``` Rute Fungsi Hiburan
* ```/fun/khodam?name=YOUR_NAME```, Melakukan cek khodam

### ```/test``` Rute Fungsi Pengetesan
* ```/```, Menampilkan sebuah teks

## Credits
Terima kasih kepada semua [kontributor]() yang telah meluangkan waktunya untuk berkontribusi.

