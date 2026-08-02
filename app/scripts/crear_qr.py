import qrcode

url = "https://www.academia-menteabierta.com"

qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=15,
    border=4,
)

qr.add_data(url)
qr.make(fit=True)

img = qr.make_image(fill_color="#1E3A8A", back_color="white")

img.save("public/QR_MenteAbierta.png")

print("QR creado correctamente.")