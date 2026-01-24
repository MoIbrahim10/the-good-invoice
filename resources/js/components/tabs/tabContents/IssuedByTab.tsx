import { LogoIcon } from '../../icons/LogoIcon';
import { Button } from '../../layout/Button';
import { useInvoiceState } from '../../../hooks/useInvoiceState';
import { useInvoiceActions } from '../../../hooks/useInvoiceActions';

export function IssuedByTab() {
  const { state } = useInvoiceState();
  const { updateIssuer } = useInvoiceActions();

  const issuer = state.data.issuer;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        updateIssuer({ logo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="py-3 flex flex-col gap-3">
      {/* Logo Upload Section */}
      <div className="flex gap-2.5 items-stretch">
        {/* Logo Placeholder */}
        <div
          className="flex flex-row justify-center items-center py-2 px-3 bg-bg-strong border border-dashed border-stroke-strong rounded-md 
      aspect-square self-stretch min-h-[55px]">
        <div>

          {issuer.logo ? (
            <img
              src={issuer.logo}
              alt="Logo"
              className="object-contain rounded-md"
            />
          ) : (
            <LogoIcon size={18} />
          )}
          </div>
        </div>

        {/* Logo Info and Upload */}
        <div className="flex items-end justify-between gap-2.5 h-fit">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-normal leading-[17px] flex items-center text-text-default">
              Your logo
            </h3>
            <p className="text-sm font-normal text-text-weaker leading-[17px] flex items-center">
              Square (1:1) format only. SVG preferred, PNG and JPEG supported.
            </p>
          </div>

          <label className="shrink-0 cursor-pointer">
            <input
              type="file"
              accept="image/svg+xml,image/png,image/jpeg,image/jpg"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <Button>Upload</Button>
          </label>
        </div>
      </div>

      {/* Input Fields Section */}
      <div className="flex flex-col gap-2">
        {/* Name Field */}
        <div className="flex items-center gap-4">
          <label className="w-20 text-sm font-normal text-text-strong leading-none shrink-0">
            Name
          </label>
          <input
            type="text"
            value={issuer.companyName}
            onChange={(e) => updateIssuer({ companyName: e.target.value })}
            placeholder="Jane Doe"
            className="flex-1 px-3 py-2 border border-stroke-default rounded-md bg-bg-default text-sm text-text-strong placeholder:text-text-weak focus:outline-none focus:ring-1 focus:ring-stroke-strong"
          />
        </div>

        {/* Email Field */}
        <div className="flex items-center gap-4">
          <label className="w-20 text-sm font-normal text-text-strong leading-none shrink-0">
            Email
          </label>
          <input
            type="email"
            value={issuer.contact.email || ''}
            onChange={(e) =>
              updateIssuer({ contact: { ...issuer.contact, email: e.target.value } })
            }
            placeholder="jane@example.com"
            className="flex-1 px-3 py-2 border border-stroke-default rounded-md bg-bg-default text-sm text-text-strong placeholder:text-text-weak focus:outline-none focus:ring-1 focus:ring-stroke-strong"
          />
        </div>

        {/* Address Field */}
        <div className="flex items-start gap-4">
          <label className="w-20 text-sm font-normal text-text-strong leading-none shrink-0 pt-2">
            Address
          </label>
          <textarea
            value={issuer.address.line1}
            onChange={(e) =>
              updateIssuer({
                address: { ...issuer.address, line1: e.target.value },
              })
            }
            placeholder="Street, city, country"
            rows={3}
            className="flex-1 px-3 py-2 border border-stroke-default rounded-md bg-bg-default text-sm text-text-strong placeholder:text-text-weak focus:outline-none focus:ring-1 focus:ring-stroke-strong resize-none"
          />
        </div>
      </div>
    </div>
  );
}
