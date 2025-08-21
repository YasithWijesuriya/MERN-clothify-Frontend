// ColorButton.jsx
import { useGetColorsQuery, useGetAllProductsQuery } from "@/lib/api";
import { useParams, Link } from "react-router-dom";

function getContrastText(hex) {
  if (!hex) return 'black';
  const h = hex.replace('#', '');
  if (h.length !== 6) return 'black';
  const r = parseInt(h.substring(0,2), 16);
  const g = parseInt(h.substring(2,4), 16);
  const b = parseInt(h.substring(4,6), 16);
  const yiq = (r*299 + g*587 + b*114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}

function ColorButton() {
  const { data: colors = [],} = useGetColorsQuery();
  const { category, colorSlug } = useParams(); // category + colorSlug from URL

  


  // ensure query hook receives params (so products list updates)
  useGetAllProductsQuery({
    categorySlug: category,
    colorSlug: colorSlug,
  });

  if (!category) return null;

  return (
    <nav className="flex flex-wrap justify-end gap-2 mt-5 px-4 sm:px-0 mr-5">
      <Link
        to={`/shop/${category}`}
        className={`px-4 py-2 rounded-full text-sm font-medium border`}
        style={{
          background: !colorSlug ? '#111' : '#f0f0f0',
          color: !colorSlug ? 'white' : 'black'
        }}
      >
        All
      </Link>

      {colors.map((c) => {
        const slug = (c.colorSlug ?? '').toString().toLowerCase();
        const active = slug === (colorSlug || '').toString().toLowerCase();
        const bg = c.description || undefined; // hex from DB e.g. "#0000FF"
        const textColor = getContrastText(bg);

        return (
          <Link
            key={c._id}
            to={`/shop/${category}/${slug}`}
            className={`px-4 py-2 rounded-full text-sm font-medium border`}
            style={{
              background: bg || undefined,
              color: bg ? textColor : undefined,
              boxShadow: active ? '0 0 0 3px rgba(0,0,0,0.08)' : undefined,
            }}
          >
            {c.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default ColorButton;
