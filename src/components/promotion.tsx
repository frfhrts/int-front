import React from "react";

interface HeroCardProps {
  badge: string;
  title: string;
  description: string;
  readMoreText: string;
  buttonText: string;
  buttonHref: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
  variant?: "default" | "crown" | "tickets";
}

const HeroCard: React.FC<HeroCardProps> = ({
  badge,
  title,
  description,
  readMoreText,
  buttonText,
  buttonHref,
  imageUrl,
  imageAlt,
}) => {
  return (
    <div className="flex h-[220px] flex-1 bg-slate-800 p-4 rounded-lg shadow-lg flex-col md:flex-row gap-4 relative color-[#2596be]">
      <div className="text-section">
        <div className="badge">{badge}</div>
        <h3 className="title">{title}</h3>
        <p className="description">
          {description} <span>{readMoreText}</span>
        </p>
        <a className="button-text" href={buttonHref}>
          {buttonText}
        </a>
      </div>

      <div className="pic-section">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="object-cover w-full h-full mixed-blend-screen rounded-lg"
        />
      </div>
    </div>
  );
};

// I have hardcoded values for promotions because there was no API for that
const StakeRacesHero = () => {
  const heroCards = [
    {
      badge: "Promotion",
      title: "Daily Races",
      description: "Play in our $100,000 Daily Race",
      readMoreText: "Read More",
      buttonText: "Race Now",
      buttonHref: "/casino/home?promotionType=race&modal=promotions",
      imageUrl:
        "https://cdn.sanity.io/images/tdrhge4k/stake-com-production/0dec0a589e3aad3d7130fd0fbb1502d174dca0f9-1080x1080.png?w=440&h=440&fit=min&auto=format",
      imageAlt: "Daily Races",
      href: "/promotions/promotion/stake-races",
      variant: "default" as const,
    },
    {
      badge: "Promotion",
      title: "Conquer the Casino",
      description: "Win a share in $50,000 every week",
      readMoreText: "Read More",
      buttonText: "Play Now",
      buttonHref: "/casino/group/conquer-the-casino",
      imageUrl:
        "https://cdn.sanity.io/images/tdrhge4k/stake-com-production/24d3cdf5c6555efee525cd6169c05262df312992-1080x1080.png?w=440&h=440&fit=min&auto=format",
      imageAlt: "Conquer the Casino",
      href: "/promotions/promotion/conquer-the-casino",
      variant: "crown" as const,
    },
    {
      badge: "Promotion",
      title: "Weekly Raffle",
      description: "Share in $75,000 each week",
      readMoreText: "Read More",
      buttonText: "Learn More",
      buttonHref: "/casino/home?promotionType=giveaway&modal=promotions",
      imageUrl:
        "https://cdn.sanity.io/images/tdrhge4k/stake-com-production/4fa560aab3d13e9392871cf976722179f7c7bb5e-1080x1080.png?w=440&h=440&fit=min&auto=format",
      imageAlt: "Weekly Raffle",
      href: "/promotions/promotion/weekly-giveaway",
      variant: "tickets" as const,
    },
  ];

  return (
    <div className="flex flex-wrap -justify-between overflow-x-auto gap-2 pt-4 bg-slate-900">
      {heroCards.map((card, index) => (
        <HeroCard key={index} {...card} />
      ))}
    </div>
  );
};

export default StakeRacesHero;
