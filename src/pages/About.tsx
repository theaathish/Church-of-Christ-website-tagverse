import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Heart, Cross } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-16 bg-gradient-soft">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            The New Covenant
          </h1>
          <p className="text-xl text-accent font-medium">
            Understanding God's Promise of Grace and Redemption
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Introduction */}
          <Card className="shadow-soft border-primary/10">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Cross className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                    What is the New Covenant?
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    The New Covenant is God's promise of salvation and eternal life through Jesus Christ. 
                    As prophesied in Jeremiah 31:31-34 and fulfilled through Christ's sacrifice, it represents 
                    a new relationship between God and humanity—one based not on the law, but on grace, faith, and love.
                  </p>
                  <blockquote className="border-l-4 border-accent pl-6 py-2 my-6 italic text-foreground/90">
                    "For this is My blood of the new covenant, which is shed for many for the remission of sins."
                    <footer className="text-sm text-accent font-medium mt-2 not-italic">— Matthew 26:28</footer>
                  </blockquote>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* The Meaning */}
          <Card className="shadow-soft border-primary/10">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                    The Blood of Christ
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    Through His death on the cross, Jesus shed His blood as the ultimate sacrifice for our sins. 
                    This act of perfect love established the New Covenant, offering forgiveness, redemption, 
                    and reconciliation with God to all who believe.
                  </p>
                  <div className="space-y-3 mt-6">
                    <div className="flex gap-3">
                      <span className="text-accent font-bold">•</span>
                      <p className="text-foreground/90">
                        <strong className="text-primary">Forgiveness:</strong> Our sins are washed away through His blood (Ephesians 1:7)
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-accent font-bold">•</span>
                      <p className="text-foreground/90">
                        <strong className="text-primary">Redemption:</strong> We are bought with a price and set free (1 Peter 1:18-19)
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-accent font-bold">•</span>
                      <p className="text-foreground/90">
                        <strong className="text-primary">Eternal Life:</strong> We receive the promise of everlasting life with God (John 3:16)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Living in the Covenant */}
          <Card className="shadow-soft border-primary/10">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                    Living in the New Covenant
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    As believers under the New Covenant, we are called to live transformed lives—walking in 
                    faith, love, and obedience to Christ. We are not saved by our works, but by grace through 
                    faith, and we respond to God's love by loving Him and loving others.
                  </p>
                  <blockquote className="border-l-4 border-accent pl-6 py-2 my-6 italic text-foreground/90">
                    "A new commandment I give to you, that you love one another; as I have loved you, 
                    that you also love one another."
                    <footer className="text-sm text-accent font-medium mt-2 not-italic">— John 13:34</footer>
                  </blockquote>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Through baptism, we enter into this covenant, dying to our old selves and rising to 
                    new life in Christ. We gather together in worship, remembering His sacrifice through 
                    communion, and encouraging one another as we walk this journey of faith.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Closing */}
          <div className="bg-primary/5 rounded-xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              God's Love Endures Forever
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The New Covenant is not merely a religious concept—it is the living reality of God's love for 
              each of us. Through Jesus, we have been given unmerited grace, unfailing mercy, and eternal hope. 
              May we never forget the price that was paid, and may we live each day in gratitude for the 
              precious blood of the New Covenant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
