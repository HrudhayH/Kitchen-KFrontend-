import { Metadata } from 'next';
import { ChefHat, Target, Users, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Kitchen Kettels',
  description: 'Learn about Kitchen Kettels, your trusted source for quality kitchen utensils and cookware.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-slate-900 mb-6">About Kitchen Kettels</h1>
            <p className="text-xl text-slate-600">
              Your trusted partner in creating exceptional culinary experiences through quality kitchen tools.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
            <div className="prose prose-lg text-slate-600">
              <p className="mb-4">
                Founded with a passion for quality and innovation, Kitchen Kettels has become a leading destination
                for home chefs and cooking enthusiasts seeking premium kitchen utensils and cookware.
              </p>
              <p className="mb-4">
               {` We believe that great cooking starts with great tools. That's why we carefully curate our collection
                to include only the finest products from renowned brands around the world. Every item in our catalog
                is selected for its quality, functionality, and durability.`}
              </p>
              <p>
                {`Our mission is to empower home cooks and professional chefs alike by providing access to the best
                kitchen equipment available. Whether you're preparing a family meal or hosting a dinner party,
                we have the tools you need to create culinary masterpieces.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-slate-600">
                We partner with the best brands to ensure every product meets our high standards.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
              <p className="text-slate-600">
                {`Your satisfaction is our priority. We're here to help you find the perfect tools.`}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-slate-600">
                We constantly update our catalog with the latest innovations in kitchen technology.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expertise</h3>
              <p className="text-slate-600">
                Our team of culinary experts is passionate about helping you cook better.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Join Our Community</h2>
            <p className="text-lg text-slate-600 mb-8">
              Become part of a growing community of cooking enthusiasts who trust Kitchen Kettels
              for their culinary needs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
