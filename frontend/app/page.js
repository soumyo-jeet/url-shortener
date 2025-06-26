"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [inputUrl, setinputUrl] = useState(null)
  const [urlDtls, seturlDtls] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [error, seterror] = useState(null)
  const [message, setmessage] = useState(null)
  const host = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT


  const handleCopy = async (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard')
        setmessage("Text copied to clipboard")
        setTimeout(() => {
          setmessage(null);
        }, 3000);
      })
      .catch(err => {
        seterror('Failed to copy text')
        console.error('Failed to copy text: ', err);
      });
  }

  const handleDownload = (qrCode) => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qr-code.png";
    link.click();
    setmessage("QR Code downloaded")
    setTimeout(() => {
      setmessage(null);
    }, 3000);
  }

  const isValidUrl = (urlString) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  }


  const findUrl = async () => {
    try {
      const response = await fetch(`${host}api/urls/savedUrl`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: inputUrl })
      })
      return response

    } catch (error) {
      console.log(error)

    }
  }

  const createNew = async () => {
    try {
      const response = await fetch(`${host}api/urls/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ actualUrl: inputUrl })
      })
      const data = await response.json()
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }

  const reDirect = async (url) => {
    window.open(`${url}`, '_blank');
  }

  const handleClick = async () => {
    seterror(null)
    if (!inputUrl) return
    console.log(inputUrl)

    if (!isValidUrl(inputUrl)) {
      console.log("not a valid url")
      seterror("Not a valid URL")
      return
    }

    setisLoading(true)
    try {
      let findres = await findUrl()
      if (findres.status !== 200) {
        await createNew()
        findres = await findUrl()
      }
      const data = await findres.json()
      console.log(data)
      seturlDtls(data)
    } catch (error) {
      seterror("Something went wrong")
      console.log(error)
    } finally {
      setisLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br w-full from-green-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Free <span className="text-green-600">Short URL & QR Code</span> Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Enter your URL in the following box and get instant short URL with QR code
          </p>
          {
            error && (
              <p className="text-red-600 max-w-2xl mx-auto mb-8">
                {error}
              </p>
            )
          }
          {
            message && (
              <p className="text-green-600 max-w-2xl mx-auto mb-8">
                {message}
              </p>

            )
          }
        </div>

        {/* URL Input Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="Enter your long URL here"
              className="flex-1 py-6 text-lg"
              onChange={(e) => {
                setinputUrl(e.target.value)
                console.log(inputUrl)
              }}
            />
            <Button
              size="lg"
              className="py-6 px-8 text-lg"
              disabled={isLoading || !inputUrl?.trim()}
              onClick={handleClick}>
              Shorten
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="grid gap-6 max-w-4xl mx-auto">
          {
            isLoading ? <h1>Loading...</h1> : (
              urlDtls && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Your Short URL</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* URL Info */}
                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Original URL</p>
                          <p
                            className="text-ellipsis hover:underline cursor-pointer overflow-hidden"
                            onClick={() => reDirect(urlDtls?.actualUrl)}>
                            {urlDtls?.actualUrl}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Short URL</p>
                          <div className="flex items-center gap-2">
                            <p
                              className="text-green-600 hover:underline cursor-pointer font-medium"
                              onClick={() => reDirect(host + urlDtls?.shortUrl)}>
                              {host + urlDtls?.shortUrl}
                            </p>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleCopy(host + urlDtls?.shortUrl)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {/* Click Counter */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>Total clicks:</span>
                          <span className="font-medium text-gray-700">
                            {urlDtls?.clicks?.length || 0}
                          </span>
                        </div>
                      </div>

                      {/* QR Code */}
                      <div className="flex flex-col items-center justify-between">
                        <Image
                          alt="QR Code"
                          src={urlDtls?.qr}
                          width={120}
                          height={120}
                          className="border rounded"
                        />
                        <Button
                          variant="outline"
                          className="mt-4 w-full"
                          onClick={() => handleDownload(urlDtls?.qr)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download QR
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            )
          }

        </div>
      </div>
    </div>

  );
}
