import newImage1 from "@/assets/Church Event-1.jpeg";
import newImage2 from "@/assets/Church Event-27.jpeg";
import newImage3 from "@/assets/Church Event-37.jpeg";
import newImage4 from "@/assets/Church Event-5.jpeg";
import newImage5 from "@/assets/Church Event-6.jpeg";
import newImage6 from "@/assets/Church Event-7.jpeg";
import newImage7 from "@/assets/Church Event-8.jpeg";
import newImage8 from "@/assets/Church Event-10.jpeg";
import newImage9 from "@/assets/Church Event-11.jpeg";
import newImage10 from "@/assets/Church Event-12.jpeg";
import newImage11 from "@/assets/Church Event-13.jpeg";
import newImage12 from "@/assets/Church Event-15.jpeg";

const Gallery = () => {
  const images = [
    {
      src: newImage1,
      alt: "Gathering for baptism",
      caption: "Ready for a blessed baptism moment",
    },
    {
      src: newImage2,
      alt: "God's Creation",
      caption: "Peace and beauty in God's creation",
    },
    {
      src: newImage3,
      alt: "Wedding celebration",
      caption: "Joyful moments in a blessed union",
    },{
      src: newImage4,
      alt: "Baptism taking place in the water",
      caption: "A blessed moment of baptism",
    },
    {
      src: newImage5,
      alt: "Baptism taking place in the water",
      caption: "A blessed moment of baptism",
    },
    {
      src: newImage6,
      alt: "Baptism taking place in the water",
      caption: "A blessed moment of baptism",
    },
    {
      src: newImage7,
      alt: "Church group after baptism",
      caption: "Sharing joy after a blessed baptism",
    },{
      src: newImage8,
      alt: "God's Creation",
      caption: "Peace and beauty in God's creation",
    },
    {
      src: newImage9,
      alt: "Church group assembled before baptism",
      caption: "A peaceful moment before the baptism",
    },
    {
      src: newImage10,
      alt: "Baptism taking place in the water",
      caption: "A blessed moment of baptism",
    },{
      src: newImage11,
      alt: "Church group after baptism",
      caption: "Sharing joy after a blessed baptism",
    },
    {
      src: newImage12,
      alt: "God's Creation",
      caption: "Peace and beauty in God's creation",
    }
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
