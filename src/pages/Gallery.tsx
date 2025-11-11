import worshipScene from "@/assets/worship-scene.jpg";
import prayerBible from "@/assets/prayer-bible.jpg";
import fellowship from "@/assets/fellowship.jpg";
import peaceNature from "@/assets/peace-nature.jpg";
import crossSunrise from "@/assets/cross-sunrise.jpg";
import covenantCup from "@/assets/covenant-cup.jpeg";

const Gallery = () => {
  const images = [
    {
      src: worshipScene,
      alt: "Worship and Communion",
      caption: "Remembering His sacrifice through worship",
    },
    {
      src: covenantCup,
      alt: "The Blood of the New Covenant",
      caption: "The cup of the New Covenant - Matthew 26:28",
    },
    {
      src: prayerBible,
      alt: "Prayer and Scripture",
      caption: "Finding truth and guidance in God's Word",
    },
    {
      src: fellowship,
      alt: "Community Fellowship",
      caption: "United in love and faith",
    },
    {
      src: crossSunrise,
      alt: "The Cross at Sunrise",
      caption: "The hope and light of Christ",
    },
    {
      src: peaceNature,
      alt: "God's Creation",
      caption: "Peace and beauty in God's creation",
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-gradient-soft">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            Gallery
          </h1>
          <p className="text-xl text-muted-foreground">
            Moments of faith, worship, and God's grace
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-soft hover:shadow-elevated transition-all duration-500 bg-card"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-6 text-primary-foreground transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-lg font-medium">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="bg-card rounded-xl p-8 md:p-12 shadow-soft text-center">
            <blockquote className="text-xl md:text-2xl text-primary font-medium italic mb-4">
              "Let us hold fast the confession of our hope without wavering, for He who promised is faithful."
            </blockquote>
            <footer className="text-accent font-medium">— Hebrews 10:23</footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
