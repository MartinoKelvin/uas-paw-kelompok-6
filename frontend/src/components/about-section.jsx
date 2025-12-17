import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const AboutSection = ({
  title = "Discover Our Story and What Drives Us",
  description = "Founded with a passion for the adventure and a commitment to comfort, Wonderfull Inn is more than just a place to stay—it's a home away from home. Our story is one of dedication to providing warm hospitality in every little details. We believe that great accommodations come from understanding the needs of our guests, which is why we've designed every aspect of our inn to ensure your comfort and satisfaction.",
  imageUrl = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop",
}) => {
  const navigate = useNavigate();

  return (
    <section className="border-border rounded-lg border p-6 md:p-12">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <div className="border-border inline-block rounded-full border px-4 py-1">
            <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              About Us
            </span>
          </div>

          <h2 className="text-foreground text-3xl leading-tight font-bold md:text-4xl">{title}</h2>

          <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
            {description}
          </p>

          <Button
            onClick={() => navigate("/about")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Learn More
          </Button>
        </div>

        {/* Image */}
        <div className="border-border overflow-hidden rounded-lg border">
          <img
            src={imageUrl}
            alt="About Wonderfull Inn"
            className="aspect-4/3 w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

AboutSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
};
