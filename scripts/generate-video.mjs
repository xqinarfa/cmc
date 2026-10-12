// scripts/generate-video.mjs
// Script untuk generate video AI via RunComfy API sesuai skill /ai-video-generation

import fs from "node:fs";
import path from "node:path";

const RUNCOMFY_TOKEN = process.env.RUNCOMFY_TOKEN;

if (!RUNCOMFY_TOKEN) {
  console.error("\n❌ Error: RUNCOMFY_TOKEN belum disetel di environment.");
  console.error("Untuk menggunakannya, dapatkan API token di https://www.runcomfy.com lalu jalankan:");
  console.error("  $env:RUNCOMFY_TOKEN = 'your_token_here'");
  console.error("  node scripts/generate-video.mjs\n");
  process.exit(1);
}

const prompt =
  "Cinematic medium tracking shot of Indonesian civil servants (ASN) in smart professional attire during an executive coaching and mentoring session inside a modern transportation ministry office, discussion around conference table with tablets and notes, panoramic windows showing elevated modern transit tracks outside, soft morning daylight, subtle authentic head nods and natural gestures, 4k photorealistic, 24fps.";

console.log("🚀 Mengirim permintaan generasi video ke RunComfy (HappyHorse 1.0)...");
console.log(`📝 Prompt: "${prompt}"\n`);

async function generate() {
  try {
    const res = await fetch(
      "https://model-api.runcomfy.net/v1/models/happyhorse/happyhorse-1-0/text-to-video",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RUNCOMFY_TOKEN}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          duration: 6,
          aspect_ratio: "16:9",
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    console.log("✅ Permintaan diterima oleh RunComfy!");
    console.log("Detail respon:", data);

    // Jika respon langsung menyertakan URL video:
    const videoUrl = data.video_url || data.output_url || (data.outputs && data.outputs[0]);
    if (videoUrl) {
      console.log(`📥 Mengunduh video dari ${videoUrl}...`);
      const videoRes = await fetch(videoUrl);
      const buffer = Buffer.from(await videoRes.arrayBuffer());
      const dest = path.join(process.cwd(), "public", "assets", "asn_coaching_video.mp4");
      fs.writeFileSync(dest, buffer);
      console.log(`🎉 Berhasil! Video tersimpan di: ${dest}`);
    } else {
      console.log("⏳ Tugas sedang diproses di queue RunComfy. ID:", data.id || data.task_id);
    }
  } catch (err) {
    console.error("❌ Gagal generate video:", err.message);
  }
}

generate();
