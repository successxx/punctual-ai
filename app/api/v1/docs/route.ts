import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const documentation = {
    openapi: '3.0.0',
    info: {
      title: 'Punctual.AI API',
      version: '1.0.0',
      description: 'Complete booking system API for Clients.AI integration'
    },
    servers: [
      { url: `${process.env.NEXT_PUBLIC_APP_URL}/api/v1` }
    ],
    security: [
      { ApiKeyAuth: [] }
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            username: { type: 'string' },
            timezone: { type: 'string' },
            booking_duration: { type: 'integer' },
            buffer_time: { type: 'integer' }
          }
        },
        Booking: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            user_id: { type: 'string', format: 'uuid' },
            guest_name: { type: 'string' },
            guest_email: { type: 'string', format: 'email' },
            start_time: { type: 'string', format: 'date-time' },
            end_time: { type: 'string', format: 'date-time' },
            status: { type: 'string', enum: ['confirmed', 'cancelled', 'pending'] },
            notes: { type: 'string' }
          }
        }
      }
    },
    paths: {
      '/users': {
        get: {
          summary: 'List users',
          parameters: [
            { name: 'email', in: 'query', schema: { type: 'string' } },
            { name: 'username', in: 'query', schema: { type: 'string' } }
          ],
          responses: {
            '200': {
              description: 'Success',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/User' }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: 'Create user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password', 'name'],
                  properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', minLength: 6 },
                    name: { type: 'string' },
                    username: { type: 'string' },
                    timezone: { type: 'string' },
                    booking_duration: { type: 'integer' },
                    buffer_time: { type: 'integer' }
                  }
                }
              }
            }
          },
          responses: {
            '201': { description: 'User created' }
          }
        }
      },
      '/bookings': {
        get: {
          summary: 'List bookings',
          parameters: [
            { name: 'userId', in: 'query', schema: { type: 'string' } },
            { name: 'startDate', in: 'query', schema: { type: 'string' } },
            { name: 'endDate', in: 'query', schema: { type: 'string' } },
            { name: 'status', in: 'query', schema: { type: 'string' } }
          ],
          responses: {
            '200': {
              description: 'Success',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Booking' }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: 'Create booking',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['user_id', 'guest_name', 'guest_email', 'start_time', 'end_time'],
                  properties: {
                    user_id: { type: 'string', format: 'uuid' },
                    guest_name: { type: 'string' },
                    guest_email: { type: 'string', format: 'email' },
                    start_time: { type: 'string', format: 'date-time' },
                    end_time: { type: 'string', format: 'date-time' },
                    notes: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            '201': { description: 'Booking created' },
            '409': { description: 'Time slot unavailable' }
          }
        }
      },
      '/availability/slots': {
        post: {
          summary: 'Get available time slots',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['user_id', 'date'],
                  properties: {
                    user_id: { type: 'string', format: 'uuid' },
                    date: { type: 'string', format: 'date' }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Available slots',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'object',
                        properties: {
                          date: { type: 'string' },
                          slots: {
                            type: 'array',
                            items: { type: 'string' }
                          },
                          duration: { type: 'integer' },
                          timezone: { type: 'string' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return NextResponse.json(documentation)
}