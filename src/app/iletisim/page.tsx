"use client";

import { useState } from "react";

export default function Iletisim() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Baslik */}
      <section className="bg-gradient-to-br from-gray-900 to-primary-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-300 font-semibold text-sm uppercase tracking-wider">
            Iletisim
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Bize Ulasin
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Alkolu icecek tedarik ihtiyaclariniz icin bizimle iletisime gecin.
            En kisa surede size donelim.
          </p>
        </div>
      </section>

      {/* Iletisim Bilgileri & Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Iletisim Bilgileri */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Iletisim Bilgileri
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  Isletmenizin alkolu icecek tedarik ihtiyaclari icin asagidaki
                  kanallardan bize ulasabilirsiniz.
                </p>
              </div>

              {/* Iletisim Kartlari */}
              <div className="space-y-4">
                <a
                  href="tel:+902121234567"
                  className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 hover:bg-orange-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-orange-100 text-primary-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                    <p className="text-primary-700 font-medium">+90 (212) 123 45 67</p>
                    <p className="text-gray-500 text-xs mt-1">Pzt - Cuma: 09:00 - 18:00</p>
                  </div>
                </a>

                <a
                  href="mailto:info@lemars.com.tr"
                  className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 hover:bg-orange-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-orange-100 text-primary-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">E-posta</h3>
                    <p className="text-primary-700 font-medium">info@lemars.com.tr</p>
                    <p className="text-gray-500 text-xs mt-1">24 saat icinde donus</p>
                  </div>
                </a>

                <a
                  href="https://maps.app.goo.gl/7XnNs1arH4NeqCcp6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 hover:bg-orange-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-orange-100 text-primary-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                    <p className="text-gray-600 text-sm">
                      Cihangir, Guvercin Cd. No: 2/90-91
                    </p>
                    <p className="text-gray-600 text-sm">34310 Avcilar/Istanbul</p>
                    <p className="text-primary-700 text-xs mt-1 font-medium">
                      Yol tarifi al &rarr;
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/902121234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 hover:bg-green-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                    <p className="text-green-700 font-medium">+90 (212) 123 45 67</p>
                    <p className="text-gray-500 text-xs mt-1">Hizli iletisim</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Mesajiniz Iletildi
                    </h3>
                    <p className="text-gray-600 mb-6">
                      En kisa surede sizinle iletisime gececegiz. Tesekkur ederiz.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", company: "", email: "", phone: "", subject: "", message: "" });
                      }}
                      className="text-primary-700 font-medium hover:underline"
                    >
                      Yeni Mesaj Gonder
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Bize Mesaj Gonderin
                    </h2>
                    <p className="text-gray-600 text-sm mb-8">
                      Asagidaki formu doldurarak bize ulasabilirsiniz. En kisa
                      surede donus yapacagiz.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ad Soyad *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="Adiniz Soyadiniz"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sirket / Isletme Adi
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="Isletme adiniz"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            E-posta Adresi *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="ornek@sirket.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Telefon Numarasi *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="+90 (5XX) XXX XX XX"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Konu
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        >
                          <option value="">Konu Secin</option>
                          <option value="tedarik">Tedarik Talebi</option>
                          <option value="fiyat">Fiyat Bilgisi</option>
                          <option value="isbirligi">Is Birligi</option>
                          <option value="diger">Diger</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mesajiniz *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                          placeholder="Mesajinizi yazin..."
                        />
                      </div>

                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                        <p className="text-orange-800 text-xs">
                          Kisisel verileriniz 6698 Sayili KVKK kapsaminda
                          korunmaktadir. Bilgileriniz yalnizca iletisim amacli
                          kullanilacaktir.
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        Mesaji Gonder
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.6!2d28.7!3d41.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzAwLjAiTiAyOMKwNDInMDAuMCJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="LeMars Gida Icecek Konum"
            />
            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-900 mb-1">LeMars Gida Icecek</h3>
                <p className="text-gray-600 text-sm">
                  Cihangir, Guvercin Cd. No: 2/90-91, 34310 Avcilar/Istanbul
                </p>
              </div>
              <a
                href="https://maps.app.goo.gl/7XnNs1arH4NeqCcp6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-all shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Yol Tarifi Al
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
