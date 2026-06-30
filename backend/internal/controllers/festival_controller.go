package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type FestivalEvent struct {
	ID               string   `json:"id"`
	Name             string   `json:"name"`
	Date             string   `json:"date"`
	DateISO          string   `json:"dateISO"`
	FormattedDate    string   `json:"formattedDate"`
	Category         string   `json:"category"`
	ShortDesc        string   `json:"shortDesc"`
	Description      string   `json:"description"`
	Rituals          []string `json:"rituals"`
	Color            string   `json:"color"`
	Gradient         string   `json:"gradient"`
	IllustrationType string   `json:"illustrationType"`
}

var festivalEventsByYear = map[int][]FestivalEvent{
	2026: {
		{
			ID:            "nyepi",
			Name:          "Nyepi",
			Date:          "19 Maret 2026",
			DateISO:       "2026-03-19",
			FormattedDate: "Kamis, 19 Maret 2026",
			Category:      "Sasih (Sasih Kesanga)",
			ShortDesc:     "Hari Penyucian Diri dan Alam Semesta melalui Catur Brata Penyepian.",
			Description:   "Nyepi adalah hari raya Hindu yang dirayakan setiap tahun Baru Saka. Hari ini jatuh pada sehari setelah tilem Kesanga. Pada hari Nyepi, umat Hindu melaksanakan Catur Brata Penyepian: Amati Geni (tidak menyalakan api), Amati Karya (tidak bekerja), Amati Lelungan (tidak bepergian), dan Amati Lelanguan (tidak bersenang-senang). Suasana sunyi senyap menyelimuti seluruh pulau Bali selama 24 jam untuk memberikan kesempatan alam semesta memulihkan diri secara spiritual dan ekologis.",
			Rituals: []string{
				"Melasti (penyucian sarana upacara di laut/sumber air 3-4 hari sebelum Nyepi)",
				"Tawur Agung Kesanga (upacara sesajen besar di persimpangan jalan sehari sebelum Nyepi)",
				"Catur Brata Penyepian (24 jam meditasi, keheningan total, tanpa aktivitas)",
				"Ngembak Geni (silaturahmi, mengunjungi kerabat, saling memaafkan sehari setelah Nyepi)",
			},
			Color:            "#8B5E3C",
			Gradient:         "from-stone-850 via-stone-800 to-stone-900",
			IllustrationType: "nyepi",
		},
		{
			ID:            "saraswati-1",
			Name:          "Saraswati",
			Date:          "4 April 2026",
			DateISO:       "2026-04-04",
			FormattedDate: "Sabtu, 4 April 2026",
			Category:      "Pawukon (Sabtu Umanis Watugunung)",
			ShortDesc:     "Turunnya Ilmu Pengetahuan Suci dan Penghormatan Dewi Saraswati.",
			Description:   "Hari Raya Saraswati adalah hari pemujaan terhadap Dewi Saraswati sebagai dewi ilmu pengetahuan, seni, dan sastra suci. Pada hari ini, kitab suci, lontar, buku-buku pelajaran ditata rapi untuk diupacarai sesaji. Pelajar, guru, dan umat Hindu pergi ke sekolah dan pura untuk memohon ketajaman pikiran (cipta) dan kebijaksanaan. Di hari ini, umat Hindu dilarang untuk membaca atau menulis buku sebagai bentuk takzim penghormatan.",
			Rituals: []string{
				"Penyucian Kitab/Lontar (buku ditata di tempat suci and dihaturkan sesajen khusus)",
				"Persembahyangan Bersama (sembahyang di Pura Padmasana sekolah atau pura universitas)",
				"Banyu Pinaruh (ritual mandi/keramas di laut atau sumber air suci keesokan paginya sebelum matahari terbit)",
				"Dharma Gita (membaca lontar keagamaan secara berkelompok di malam hari)",
			},
			Color:            "#8B5E3C",
			Gradient:         "from-teal-850 via-emerald-800 to-emerald-600",
			IllustrationType: "saraswati",
		},
		{
			ID:            "pagerwesi-1",
			Name:          "Pagerwesi",
			Date:          "8 April 2026",
			DateISO:       "2026-04-08",
			FormattedDate: "Rabu, 8 April 2026",
			Category:      "Pawukon (Rabu Kliwon Sinta)",
			ShortDesc:     "Memagari Diri dengan Benteng Ilmu Pengetahuan dan Keteguhan Iman.",
			Description:   "Pagerwesi dirayakan empat hari setelah Saraswati. Pagerwesi berasal dari kata 'pager' (pagar/benteng) dan 'wesi' (besi), yang melambangkan perlindungan diri yang kuat. Hari raya ini bertujuan untuk memagari jiwa dan pikiran umat agar tidak terpengaruh oleh godaan negatif, menggunakan ilmu pengetahuan suci yang diperoleh saat Saraswati. Pemujaan ditujukan kepada Sanghyang Pramesti Guru (Tuhan sebagai guru semesta).",
			Rituals: []string{
				"Pemujaan Sang Hyang Pramesti Guru (memohon perlindungan spiritual dan tuntunan moral)",
				"Mebanten Pagerwesi (menghaturkan sesaji khusus di pekarangan rumah dan pura keluarga)",
				"Yoga Samadhi (melakukan perenungan batin dan meditasi hening)",
				"Mapinton (upacara pengenalan ajaran suci bagi anak-anak yang mulai belajar)",
			},
			Color:            "#A61E2D",
			Gradient:         "from-stone-900 via-rose-950 to-[#A61E2D]",
			IllustrationType: "pagerwesi",
		},
		{
			ID:            "galungan",
			Name:          "Galungan",
			Date:          "17 Juni 2026",
			DateISO:       "2026-06-17",
			FormattedDate: "Rabu, 17 Juni 2026",
			Category:      "Pawukon (Rabu Kliwon Dungulan)",
			ShortDesc:     "Kemenangan Dharma (Kebaikan) melawan Adharma (Keburukan).",
			Description:   "Galungan dirayakan oleh umat Hindu Bali setiap 210 hari sekali (menggunakan kalender wuku). Hari raya ini menandai kemenangan Dharma (kebaikan) atas Adharma (kejahatan). Ciri khas perayaan Galungan adalah pemasangan Penjor (hiasan bambu melengkung yang megah dihiasi janur dan hasil bumi) di depan rumah sebagai simbol syukur kepada Sang Hyang Widhi atas segala kemakmuran dan lambang Gunung Agung yang suci.",
			Rituals: []string{
				"Tumpek Wariga (penyucian tumbuh-tumbuhan untuk kelayakan sarana upacara)",
				"Sugihan Jawa & Sugihan Bali (pembersihan alam semesta secara makrokosmos dan mikrokosmos)",
				"Penampahan Galungan (persiapan sesaji, pemotongan babi untuk hidangan lawar)",
				"Persembahyangan Galungan (sembahyang bersama keluarga di Pemerajan dan Pura Kahyangan Tiga)",
			},
			Color:            "#C89B3C",
			Gradient:         "from-amber-800 via-amber-600 to-[#C89B3C]",
			IllustrationType: "galungan",
		},
		{
			ID:            "kuningan",
			Name:          "Kuningan",
			Date:          "27 Juni 2026",
			DateISO:       "2026-06-27",
			FormattedDate: "Sabtu, 27 Juni 2026",
			Category:      "Pawukon (Sabtu Kliwon Kuningan)",
			ShortDesc:     "Hari Pemujaan Dewa dan Leluhur yang Turun Memberikan Berkah.",
			Description:   "Kuningan dirayakan tepat 10 hari setelah Galungan. Umat Hindu meyakini bahwa pada hari Kuningan para Dewa, Bhatara, dan leluhur turun kembali ke bumi untuk memberikan wara nugraha (berkah). Persembahyangan pada hari Kuningan harus diselesaikan sebelum tengah hari (jam 12 siang), karena setelah itu para leluhur diyakini kembali ke swargaloka. Nasi kuning disajikan dalam wadah selanggi sebagai simbol limpahan karunia pangan dan materi dari Yang Maha Kuasa.",
			Rituals: []string{
				"Penampahan Kuningan (malam persiapan sesaji khusus)",
				"Pemasangan Tamiang dan Endongan (tamiang lambang perlindungan dewa, endongan lambang bekal spiritual)",
				"Persembahyangan Pagi Hari (dilaksanakan khusyuk sebelum matahari berada tegak lurus)",
				"Sajian Nasi Kuning (simbol limpahan karunia pangan dan materi dari Yang Maha Kuasa)",
			},
			Color:            "#C89B3C",
			Gradient:         "from-yellow-750 via-[#C89B3C] to-amber-500",
			IllustrationType: "kuningan",
		},
		{
			ID:            "saraswati-2",
			Name:          "Saraswati",
			Date:          "31 Oktober 2026",
			DateISO:       "2026-10-31",
			FormattedDate: "Sabtu, 31 Oktober 2026",
			Category:      "Pawukon (Sabtu Umanis Watugunung)",
			ShortDesc:     "Turunnya Ilmu Pengetahuan Suci dan Penghormatan Dewi Saraswati.",
			Description:   "Hari Raya Saraswati adalah hari pemujaan terhadap Dewi Saraswati sebagai dewi ilmu pengetahuan, seni, dan sastra suci. Pada hari ini, kitab suci, lontar, buku-buku pelajaran ditata rapi untuk diupacarai sesaji. Pelajar, guru, dan umat Hindu pergi ke sekolah dan pura untuk memohon ketajaman pikiran (cipta) dan kebijaksanaan. Di hari ini, umat Hindu dilarang untuk membaca atau menulis buku sebagai bentuk takzim penghormatan.",
			Rituals: []string{
				"Penyucian Kitab/Lontar (buku ditata di tempat suci dan dihaturkan sesajen khusus)",
				"Persembahyangan Bersama (sembahyang di Pura Padmasana sekolah atau pura universitas)",
				"Banyu Pinaruh (ritual mandi/keramas di laut atau sumber air suci keesokan paginya sebelum matahari terbit)",
				"Dharma Gita (membaca lontar keagamaan secara berkelompok di malam hari)",
			},
			Color:            "#8B5E3C",
			Gradient:         "from-teal-850 via-emerald-800 to-emerald-600",
			IllustrationType: "saraswati",
		},
		{
			ID:            "pagerwesi-2",
			Name:          "Pagerwesi",
			Date:          "4 November 2026",
			DateISO:       "2026-11-04",
			FormattedDate: "Rabu, 4 November 2026",
			Category:      "Pawukon (Rabu Kliwon Sinta)",
			ShortDesc:     "Memagari Diri dengan Benteng Ilmu Pengetahuan dan Keteguhan Iman.",
			Description:   "Pagerwesi dirayakan empat hari setelah Saraswati. Pagerwesi berasal dari kata 'pager' (pagar/benteng) dan 'wesi' (besi), yang melambangkan perlindungan diri yang kuat. Hari raya ini bertujuan untuk memagari jiwa dan pikiran umat agar tidak terpengaruh oleh godaan negatif, menggunakan ilmu pengetahuan suci yang diperoleh saat Saraswati. Pemujaan ditujukan kepada Sanghyang Pramesti Guru (Tuhan sebagai guru semesta).",
			Rituals: []string{
				"Pemujaan Sang Hyang Pramesti Guru (memohon perlindungan spiritual dan tuntunan moral)",
				"Mebanten Pagerwesi (menghaturkan sesaji khusus di pekarangan rumah dan pura keluarga)",
				"Yoga Samadhi (melakukan perenungan batin dan meditasi hening)",
				"Mapinton (upacara pengenalan ajaran suci bagi anak-anak yang mulai belajar)",
			},
			Color:            "#A61E2D",
			Gradient:         "from-stone-900 via-rose-950 to-[#A61E2D]",
			IllustrationType: "pagerwesi",
		},
	},
	2027: {
		{
			ID:            "galungan-1",
			Name:          "Galungan",
			Date:          "13 Januari 2027",
			DateISO:       "2027-01-13",
			FormattedDate: "Rabu, 13 Januari 2027",
			Category:      "Pawukon (Rabu Kliwon Dungulan)",
			ShortDesc:     "Kemenangan Dharma (Kebaikan) melawan Adharma (Keburukan).",
			Description:   "Galungan dirayakan oleh umat Hindu Bali setiap 210 hari sekali (menggunakan kalender wuku). Hari raya ini menandai kemenangan Dharma (kebaikan) atas Adharma (kejahatan). Ciri khas perayaan Galungan adalah pemasangan Penjor (hiasan bambu melengkung yang megah dihiasi janur dan hasil bumi) di depan rumah sebagai simbol syukur kepada Sang Hyang Widhi atas segala kemakmuran dan lambang Gunung Agung yang suci.",
			Rituals: []string{
				"Tumpek Wariga (penyucian tumbuh-tumbuhan untuk kelayakan sarana upacara)",
				"Sugihan Jawa & Sugihan Bali (pembersihan alam semesta secara makrokosmos dan mikrokosmos)",
				"Penampahan Galungan (persiapan sesaji, pemotongan babi untuk hidangan lawar)",
				"Persembahyangan Galungan (sembahyang bersama keluarga di Pemerajan dan Pura Kahyangan Tiga)",
			},
			Color:            "#C89B3C",
			Gradient:         "from-amber-800 via-amber-600 to-[#C89B3C]",
			IllustrationType: "galungan",
		},
		{
			ID:            "kuningan-1",
			Name:          "Kuningan",
			Date:          "23 Januari 2027",
			DateISO:       "2027-01-23",
			FormattedDate: "Sabtu, 23 Januari 2027",
			Category:      "Pawukon (Sabtu Kliwon Kuningan)",
			ShortDesc:     "Hari Pemujaan Dewa dan Leluhur yang Turun Memberikan Berkah.",
			Description:   "Kuningan dirayakan tepat 10 hari setelah Galungan. Umat Hindu meyakini bahwa pada hari Kuningan para Dewa, Bhatara, dan leluhur turun kembali to bumi untuk memberikan wara nugraha (berkah). Persembahyangan pada hari Kuningan harus diselesaikan sebelum tengah hari (jam 12 siang), karena setelah itu para leluhur diyakini kembali ke swargaloka. Nasi kuning disajikan dalam wadah selanggi sebagai simbol kemakmuran.",
			Rituals: []string{
				"Penampahan Kuningan (malam persiapan sesaji khusus)",
				"Pemasangan Tamiang dan Endongan (tamiang lambang perlindungan dewa, endongan lambang bekal spiritual)",
				"Persembahyangan Pagi Hari (dilaksanakan khusyuk sebelum matahari berada tegak lurus)",
				"Sajian Nasi Kuning (simbol limpahan karunia pangan dan materi dari Yang Maha Kuasa)",
			},
			Color:            "#C89B3C",
			Gradient:         "from-yellow-750 via-[#C89B3C] to-amber-500",
			IllustrationType: "kuningan",
		},
		{
			ID:            "nyepi",
			Name:          "Nyepi",
			Date:          "8 Maret 2027",
			DateISO:       "2027-03-08",
			FormattedDate: "Senin, 8 Maret 2027",
			Category:      "Sasih (Sasih Kesanga)",
			ShortDesc:     "Hari Penyucian Diri dan Alam Semesta melalui Catur Brata Penyepian.",
			Description:   "Nyepi adalah hari raya Hindu yang dirayakan setiap tahun Baru Saka. Hari ini jatuh pada sehari setelah tilem Kesanga. Pada hari Nyepi, umat Hindu melaksanakan Catur Brata Penyepian: Amati Geni (tidak menyalakan api), Amati Karya (tidak bekerja), Amati Lelungan (tidak bepergian), dan Amati Lelanguan (tidak bersenang-senang). Suasana sunyi senyap menyelimuti seluruh pulau Bali selama 24 jam untuk memberikan kesempatan alam semesta memulihkan diri secara spiritual dan ekologis.",
			Rituals: []string{
				"Melasti (penyucian sarana upacara di laut/sumber air 3-4 hari sebelum Nyepi)",
				"Tawur Agung Kesanga (upacara sesajen besar di persimpangan jalan sehari sebelum Nyepi)",
				"Catur Brata Penyepian (24 jam meditasi, keheningan total, tanpa aktivitas)",
				"Ngembak Geni (silaturahmi, mengunjungi kerabat, saling memaafkan sehari setelah Nyepi)",
			},
			Color:            "#8B5E3C",
			Gradient:         "from-stone-850 via-stone-800 to-stone-900",
			IllustrationType: "nyepi",
		},
		{
			ID:            "saraswati-1",
			Name:          "Saraswati",
			Date:          "29 Mei 2027",
			DateISO:       "2027-05-29",
			FormattedDate: "Sabtu, 29 Mei 2027",
			Category:      "Pawukon (Sabtu Umanis Watugunung)",
			ShortDesc:     "Turunnya Ilmu Pengetahuan Suci dan Penghormatan Dewi Saraswati.",
			Description:   "Hari Raya Saraswati adalah hari pemujaan terhadap Dewi Saraswati sebagai dewi ilmu pengetahuan, seni, dan sastra suci. Pada hari ini, kitab suci, lontar, buku-buku pelajaran ditata rapi untuk diupacarai sesaji. Pelajar, guru, dan umat Hindu pergi ke sekolah dan pura untuk memohon ketajaman pikiran (cipta) dan kebijaksanaan. Di hari ini, umat Hindu dilarang untuk membaca atau menulis buku sebagai bentuk takzim penghormatan.",
			Rituals: []string{
				"Penyucian Kitab/Lontar (buku ditata di tempat suci dan dihaturkan sesajen khusus)",
				"Persembahyangan Bersama (sembahyang di Pura Padmasana sekolah atau pura universitas)",
				"Banyu Pinaruh (ritual mandi/keramas di laut atau sumber air suci keesokan paginya sebelum matahari terbit)",
				"Dharma Gita (membaca lontar keagamaan secara berkelompok di malam hari)",
			},
			Color:            "#8B5E3C",
			Gradient:         "from-teal-850 via-emerald-800 to-emerald-600",
			IllustrationType: "saraswati",
		},
		{
			ID:            "pagerwesi-1",
			Name:          "Pagerwesi",
			Date:          "2 Juni 2027",
			DateISO:       "2027-06-02",
			FormattedDate: "Rabu, 2 Juni 2027",
			Category:      "Pawukon (Rabu Kliwon Sinta)",
			ShortDesc:     "Memagari Diri dengan Benteng Ilmu Pengetahuan dan Keteguhan Iman.",
			Description:   "Pagerwesi dirayakan empat hari setelah Saraswati. Pagerwesi berasal dari kata 'pager' (pagar/benteng) dan 'wesi' (besi), yang melambangkan perlindungan diri yang kuat. Hari raya ini dirayakan dengan pemagaran diri secara spiritual dan kebijaksanaan.",
			Rituals: []string{
				"Pemujaan Sang Hyang Pramesti Guru (memohon perlindungan spiritual dan tuntunan moral)",
				"Mebanten Pagerwesi (menghaturkan sesaji khusus di pekarangan rumah dan pura keluarga)",
				"Yoga Samadhi (melakukan perenungan batin dan meditasi hening)",
				"Mapinton (upacara pengenalan ajaran suci bagi anak-anak yang mulai belajar)",
			},
			Color:            "#A61E2D",
			Gradient:         "from-stone-900 via-rose-950 to-[#A61E2D]",
			IllustrationType: "pagerwesi",
		},
		{
			ID:            "galungan-2",
			Name:          "Galungan",
			Date:          "11 Agustus 2027",
			DateISO:       "2027-08-11",
			FormattedDate: "Rabu, 11 Agustus 2027",
			Category:      "Pawukon (Rabu Kliwon Dungulan)",
			ShortDesc:     "Kemenangan Dharma (Kebaikan) melawan Adharma (Keburukan).",
			Description:   "Galungan dirayakan oleh umat Hindu Bali setiap 210 hari sekali (menggunakan kalender wuku). Hari raya ini menandai kemenangan Dharma (kebaikan) atas Adharma (kejahatan). Ciri khas perayaan Galungan adalah pemasangan Penjor (hiasan bambu melengkung yang megah dihiasi janur dan hasil bumi) di depan rumah sebagai simbol syukur kepada Sang Hyang Widhi atas segala kemakmuran dan lambang Gunung Agung yang suci.",
			Rituals: []string{
				"Tumpek Wariga (penyucian tumbuh-tumbuhan untuk kelayakan sarana upacara)",
				"Sugihan Jawa & Sugihan Bali (pembersihan alam semesta secara makrokosmos dan mikrokosmos)",
				"Penampahan Galungan (persiapan sesaji, pemotongan babi untuk hidangan lawar)",
				"Persembahyangan Galungan (sembahyang bersama keluarga di Pemerajan dan Pura Kahyangan Tiga)",
			},
			Color:            "#C89B3C",
			Gradient:         "from-amber-800 via-amber-600 to-[#C89B3C]",
			IllustrationType: "galungan",
		},
		{
			ID:            "kuningan-2",
			Name:          "Kuningan",
			Date:          "21 Agustus 2027",
			DateISO:       "2027-08-21",
			FormattedDate: "Sabtu, 21 Agustus 2027",
			Category:      "Pawukon (Sabtu Kliwon Kuningan)",
			ShortDesc:     "Hari Pemujaan Dewa dan Leluhur yang Turun Memberikan Berkah.",
			Description:   "Kuningan dirayakan tepat 10 hari setelah Galungan. Umat Hindu meyakini bahwa pada hari Kuningan para Dewa, Bhatara, dan leluhur turun kembali ke bumi untuk memberikan wara nugraha (berkah). Persembahyangan pada hari Kuningan harus diselesaikan sebelum tengah hari (jam 12 siang), karena setelah itu para leluhur diyakini kembali ke swargaloka. Nasi kuning disajikan dalam wadah selanggi sebagai simbol kemakmuran.",
			Rituals: []string{
				"Penampahan Kuningan (malam persiapan sesaji khusus)",
				"Pemasangan Tamiang dan Endongan (tamiang lambang perlindungan dewa, endongan lambang bekal spiritual)",
				"Persembahyangan Pagi Hari (dilaksanakan khusyuk sebelum matahari berada tegak lurus)",
				"Sajian Nasi Kuning (simbol limpahan karunia pangan dan materi dari Yang Maha Kuasa)",
			},
			Color:            "#C89B3C",
			Gradient:         "from-yellow-750 via-[#C89B3C] to-amber-500",
			IllustrationType: "kuningan",
		},
		{
			ID:            "saraswati-2",
			Name:          "Saraswati",
			Date:          "25 Desember 2027",
			DateISO:       "2027-12-25",
			FormattedDate: "Sabtu, 25 Desember 2027",
			Category:      "Pawukon (Sabtu Umanis Watugunung)",
			ShortDesc:     "Turunnya Ilmu Pengetahuan Suci dan Penghormatan Dewi Saraswati.",
			Description:   "Hari Raya Saraswati adalah hari pemujaan terhadap Dewi Saraswati sebagai dewi ilmu pengetahuan, seni, dan sastra suci. Pada hari ini, kitab suci, lontar, buku-buku pelajaran ditata rapi untuk diupacarai sesaji. Pelajar, guru, dan umat Hindu pergi ke sekolah dan pura untuk memohon ketajaman pikiran (cipta) dan kebijaksanaan. Di hari ini, umat Hindu dilarang untuk membaca atau menulis buku sebagai bentuk takzim penghormatan.",
			Rituals: []string{
				"Penyucian Kitab/Lontar (buku ditata di tempat suci dan dihaturkan sesajen khusus)",
				"Persembahyangan Bersama (sembahyang di Pura Padmasana sekolah atau pura universitas)",
				"Banyu Pinaruh (ritual mandi/keramas di laut atau sumber air suci keesokan paginya sebelum matahari terbit)",
				"Dharma Gita (membaca lontar keagamaan secara berkelompok di malam hari)",
			},
			Color:            "#8B5E3C",
			Gradient:         "from-teal-850 via-emerald-800 to-emerald-600",
			IllustrationType: "saraswati",
		},
		{
			ID:            "pagerwesi-2",
			Name:          "Pagerwesi",
			Date:          "29 Desember 2027",
			DateISO:       "2027-12-29",
			FormattedDate: "Rabu, 29 Desember 2027",
			Category:      "Pawukon (Rabu Kliwon Sinta)",
			ShortDesc:     "Memagari Diri dengan Benteng Ilmu Pengetahuan dan Keteguhan Iman.",
			Description:   "Pagerwesi dirayakan empat hari setelah Saraswati. Pagerwesi berasal dari kata 'pager' (pagar/benteng) dan 'wesi' (besi), yang melambangkan perlindungan diri yang kuat. Hari raya ini dirayakan dengan pemagaran diri secara spiritual dan kebijaksanaan.",
			Rituals: []string{
				"Pemujaan Sang Hyang Pramesti Guru (memohon perlindungan spiritual dan tuntunan moral)",
				"Mebanten Pagerwesi (menghaturkan sesaji khusus di pekarangan rumah dan pura keluarga)",
				"Yoga Samadhi (melakukan perenungan batin dan meditasi hening)",
				"Mapinton (upacara pengenalan ajaran suci bagi anak-anak yang mulai belajar)",
			},
			Color:            "#A61E2D",
			Gradient:         "from-stone-900 via-rose-950 to-[#A61E2D]",
			IllustrationType: "pagerwesi",
		},
	},
}

func GetFestivals(c *gin.Context) {
	yearStr := c.DefaultQuery("year", "2026")
	year, err := strconv.Atoi(yearStr)
	if err != nil {
		year = 2026
	}

	if year < 2026 {
		year = 2026
	} else if year > 2027 {
		year = 2027
	}

	events, ok := festivalEventsByYear[year]
	if !ok {
		events = festivalEventsByYear[2026]
		year = 2026
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": fmt.Sprintf("Festival list for %d", year),
		"data":    events,
	})
}
