export type BusinessPlanTemplate = {
  slug: string;
  title: string;
  description: string;
  category: string;
};

const categoryBreaks = [
  ["Startup and technology", 16],
  ["Retail, food, and consumer", 39],
  ["Professional services", 57],
  ["Healthcare and education", 74],
  ["Hospitality and leisure", 87],
  ["Real estate", 102],
  ["Agriculture and natural resources", 110],
  ["Energy and infrastructure", 131],
  ["Finance, investment, and transactions", Number.POSITIVE_INFINITY],
] as const;

const titles = `
Pre-Seed Startup Business Plan
Startup Business Plan
SaaS Business Plan
Marketplace Business Plan
E-Commerce Business Plan
Subscription Box Business Plan
Gaming Studio Business Plan
Streaming Platform Business Plan
Cloud Infrastructure Business Plan
Fintech Payments Business Plan
AdTech Business Plan
AI/ML Startup Business Plan
Crypto Exchange Business Plan
DeFi Protocol Business Plan
GameFi Business Plan
Stablecoin Business Plan
Restaurant Business Plan
Franchise Business Plan
Retail Store Business Plan
Grocery Store Business Plan
Convenience Store Business Plan
Bookstore Business Plan
Bike Shop Business Plan
Pawn Shop Business Plan
Cannabis Dispensary Business Plan
Car Dealership Business Plan
Auto Repair Business Plan
Car Wash Business Plan
Laundromat Business Plan
Dry Cleaning Business Plan
Pet Care Business Plan
Gas Station Business Plan
Coffee Shop Business Plan
Bakery Business Plan
Brewery Business Plan
Distillery Business Plan
Food Truck Business Plan
Food Delivery Business Plan
Food Manufacturing Business Plan
Consulting Firm Business Plan
Marketing Agency Business Plan
Law Firm Business Plan
Staffing Agency Business Plan
Home Services Business Plan
HVAC Services Business Plan
Landscaping Business Plan
Pest Control Business Plan
Equipment Rental Business Plan
Moving Company Business Plan
Coworking Space Business Plan
Photography Studio Business Plan
Recording Studio Business Plan
Tutoring Center Business Plan
Driving School Business Plan
Funeral Home Business Plan
Florist Business Plan
Insurance Agency Business Plan
Hospital Business Plan
Dental Practice Business Plan
Veterinary Clinic Business Plan
Pharmacy Business Plan
Optometry Practice Business Plan
Physical Therapy Clinic Business Plan
Medical Spa Business Plan
Outpatient Clinic Business Plan
Urgent Care Business Plan
Medical Billing Business Plan
Home Health Agency Business Plan
Hospice Business Plan
Imaging Center Business Plan
Senior Living Business Plan
Private School Business Plan
Childcare Business Plan
Flight School Business Plan
Hotel Business Plan
Vacation Rental Business Plan
Campground Business Plan
Golf Course Business Plan
Marina Business Plan
Cruise Line Business Plan
Ski Resort Business Plan
Cinema Business Plan
Bowling Alley Business Plan
Escape Room Business Plan
Trampoline Park Business Plan
Theme Park Business Plan
Sports Team Business Plan
Real Estate Development Business Plan
Mobile Home Park Business Plan
Multifamily Business Plan
Office Building Business Plan
Industrial Warehouse Business Plan
Mixed-Use Development Business Plan
Self-Storage Business Plan
Student Housing Business Plan
REIT Business Plan
Real Estate Fund Business Plan
Ground Lease Business Plan
Land Banking Business Plan
Public Housing Business Plan
Home Builder Business Plan
Parking Garage Business Plan
Farm Business Plan
Livestock Business Plan
Aquaculture Business Plan
Timber Business Plan
Vineyard Business Plan
Mining Business Plan
Oil and Gas Business Plan
Waste Management Business Plan
Renewable Energy Business Plan
EV Charging Business Plan
Battery Storage Business Plan
Hydrogen Business Plan
LNG Terminal Business Plan
Electric Utility Business Plan
Water Utility Business Plan
Fibre Network Business Plan
Data Centre Business Plan
Data Center Operations Business Plan
Infrastructure Fund Business Plan
Infrastructure Concession Business Plan
Public-Private Partnership Business Plan
Airline Business Plan
Airport Business Plan
Shipping Company Business Plan
Railway Business Plan
Toll Road Business Plan
Port Business Plan
Aircraft Leasing Business Plan
Freight Trucking Business Plan
Leveraged Buyout Business Plan
M&A Business Plan
Corporate Spin-Off Business Plan
Venture Capital Fund Business Plan
Venture Studio Business Plan
Private Equity Fund Business Plan
Hedge Fund Business Plan
Fund of Funds Business Plan
Secondary Fund Business Plan
Continuation Fund Business Plan
Co-Investment Fund Business Plan
Search Fund Business Plan
Family Office Business Plan
Wealth Management Business Plan
Bank Loan Business Plan
Mortgage Portfolio Business Plan
Auto Loan Business Plan
Credit Card Business Plan
Student Loan Business Plan
Buy Now Pay Later Business Plan
Factoring Business Plan
Equipment Leasing Business Plan
Direct Lending Business Plan
Microfinance Business Plan
Distressed Debt Business Plan
Trade Finance Business Plan
ABS CLO Business Plan
Credit Portfolio Business Plan
Reinsurance Business Plan
Captive Insurance Business Plan
InsurTech Business Plan
Litigation Funding Business Plan
Revenue-Based Financing Business Plan
SPAC Business Plan
Film Production Business Plan
Music Royalties Business Plan
Biotech Licensing Business Plan
Pharmaceutical Company Business Plan
Medical Device Business Plan
Buy-and-Build Business Plan`;

function toSlug(title: string) {
  return `${title.replace(/ Business Plan$/, "").toLowerCase()}`
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .concat("-business-plan");
}

export const businessPlanTemplates: BusinessPlanTemplate[] = titles
  .trim()
  .split("\n")
  .map((title, index) => ({
    slug: toSlug(title),
    title,
    description: `A clear, practical ${title.toLowerCase()} template to structure your thinking and communicate your idea with confidence.`,
    category: categoryBreaks.find(([, end]) => index < end)?.[0] ?? "",
  }));

export const businessPlanCategories: string[] = categoryBreaks.map(([category]) => category);

export function getCategorySlug(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getBusinessPlanCategory(categorySlug: string) {
  return businessPlanCategories.find((category) => getCategorySlug(category) === categorySlug);
}

export function getBusinessPlanTemplate(slug: string) {
  return businessPlanTemplates.find((template) => template.slug === slug);
}
